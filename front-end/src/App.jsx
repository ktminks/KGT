import React, { Component } from "react";
import {
  Switch, Route, BrowserRouter as Router,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./public/App.css";

import {
  Navbar, KittenDisplay, GrowthDisplay, Dashboard, LoginPage,
} from "./components";
import KittenDataService from "./_services/data.service";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          litterTraining: [["", 0]],
          mobility: [["", 0]],
          socialization: [["", 0]],
          veterinary: [[0, 0]],
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
    };
  }

  componentDidMount = () => {
    this.retrieveKittens();
  };

  retrieveKittens = () => (
    KittenDataService.getAll()
      .then((res) => {
        this.setState({
          kittens: res.data,
        });
        // if (currentKitten.id) {
        //   this.setState({
        //     kittens: res.data,
        //   });
        // } else {
        //   this.setState({
        //     kittens: res.data,
        //     currentKitten: res.data[0],
        //     currentIndex: 0,
        //   });
        // }
        return res.data;
      })
      .catch((e) => console.log(e)));

  getIndex = (kitten) => {
    const { kittens } = this.state;
    return kittens.findIndex((k) => k.id === kitten.id);
  };

  setActiveKitten = (kitten) => {
    const index = this.getIndex(kitten);
    this.setState({
      currentKitten: kitten,
      currentIndex: index,
    });
  };

  searchName = (searchTerm) => {
    let kittens;
    try {
      KittenDataService.findByName(searchTerm)
        .then((res) => {
          if (!res.data.message) {
            KittenDataService.getAll()
              .then((all) => {
                kittens = all.data.filter((e) => e.id === res.data);
                this.setState({
                  kittens,
                  currentKitten: kittens[0],
                  currentIndex: 0,
                });
              });
          } else {
            console.log(res.data.message);
          }
        });
    } catch (e) {
      console.err(e);
    }
  };

  reset = (e) => {
    e.preventDefault();
    const { currentKitten } = this.state;
    this.retrieveKittens()
      .then(() => {
        this.setActiveKitten(currentKitten);
      });
  };

  render() {
    const { kittens, currentIndex, currentKitten } = this.state;

    return (
      <Router>
        <Navbar
          searchName={this.searchName}
          reset={this.reset}
        />
        <div className="container mt-3 w-100">
          <Switch>
            <Route path="/growth">
              <GrowthDisplay
                kittens={kittens}
                currentIndex={currentIndex}
                currentKitten={currentKitten}
                setActiveKitten={this.setActiveKitten}
              />
            </Route>
            <Route path="/kittens">
              <KittenDisplay
                kittens={kittens}
                currentIndex={currentIndex}
                currentKitten={currentKitten}
                setActiveKitten={this.setActiveKitten}
              />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/*">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
