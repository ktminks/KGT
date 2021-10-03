import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./public/bootstrap.min.css";
import "./public/App.css";

import { Navbar, KittenDisplay, GrowthDisplay } from "./components";
import KittenDataService from "./_services/data.service";

class App extends Component {
  state = {
    kittens: [],
    currentIndex: -1,
    currentKitten: {
      id: null,
      name: "",
      sex: "",
      birthdate: "",
      age: 0,
      milestones: {
        temperature: [[0, 0, 0]],
        eyes: [["", 0]],
        ears: [["", 0]],
        teeth: [["", 0]],
        litterbox: [["", 0]],
        mobility: [["", 0]],
        socialization: [["", 0]],
        vet: [[0, 0]],
      },
      food: {
        foodtype: [["", 0]],
        capacity: [[0, 0]],
        frequency: [[0, 0]],
        weaning: [[false, 0]],
      },
      concerns: [["", 0]],
      weight: [[0, 0]],
    },
    message: "",
  };

  componentDidMount = () => {
    this.retrieveKittens();
  };
  retrieveKittens = () => {
    KittenDataService.getAll()
      .then((response) => {
        this.setState({
          kittens: response.data,
        });
        return response.data;
      })
      .catch((e) => console.log(e));
  };

  setActiveKitten = (kitten, index) => {
    this.setState({
      currentKitten: kitten,
      currentIndex: index,
    });
  };

  searchName = (e, searchTerm) => {
    e.preventDefault();
    KittenDataService.findByName(searchTerm)
      .then((response) => {
        this.setState({
          kittens: response.data,
        });
        this.setActiveKitten(response.data[0]);
        console.log(response.data);
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div>
        <Navbar searchName={this.searchName} />
        <div className="container mt-3">
          <Switch>
            <Route path="/growth">
              <GrowthDisplay
                state={this.state}
                setActiveKitten={this.setActiveKitten}
              />
            </Route>
            <Route path="/kittens">
              <KittenDisplay
                state={this.state}
                setActiveKitten={this.setActiveKitten}
              />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
