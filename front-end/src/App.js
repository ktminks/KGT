import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./public/bootstrap.min.css";
import "./public/App.css";

import { Navbar, KittenDisplay } from "./components";
import KittenDataService from "./_services/data.service";

export default class App extends Component {
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
        temperatures: [[0, 0]],
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
        capacities: [[0, 0]],
        frequencies: [[0, 0]],
        weaning: [[false, 0]],
      },
      concerns: [["", 0]],
      weights: [[0, 0]],
    },
    message: "",
  };

  componentDidMount() {
    this.retrieveKittens();
  }

  retrieveKittens = () => {
    KittenDataService.getAll()
      .then((response) => {
        this.setState({
          kittens: response.data,
        });
        console.log(response.data);
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
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <div>
        <Navbar searchName={this.searchName} />
        <div className="container-fluid mt-3">
          <BrowserRouter>
            <KittenDisplay
              state={this.state}
              setActiveKitten={this.setActiveKitten}
            />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
