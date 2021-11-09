import React, { Component } from "react";
import {
  Switch, Route, BrowserRouter as Router,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./public/App.css";

import {
  NavBar, KittenDisplay, GrowthDisplay, Dashboard, LoginPage, RegisterPage,
} from "./components";
import KittenDataService from "./_services/data.service";

class App extends Component {
  defaultKitten = {
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
  };

  constructor(props) {
    super(props);
    this.state = {
      kittens: [],
      currentIndex: -1,
      currentKitten: this.defaultKitten,
    };
  }

  setLocalStorage = (kittens, currentIndex) => {
    localStorage.setItem("kittens", JSON.stringify(kittens));
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
  };

  getLocalStorage = () => {
    const kittens = JSON.parse(localStorage.getItem("kittens"));
    const currentIndex = JSON.parse(localStorage.getItem("currentIndex"));
    return { kittens, currentIndex };
  };

  compareStateToLocalStorage = () => {
    const { kittens: localKittens, currentIndex: localIndex } = this.getLocalStorage();
    if (localKittens) {
      const { currentKitten, currentIndex } = this.state;
      if (localIndex !== currentIndex
      && localKittens[localIndex] !== currentKitten) return true;
    }
    return false;
  };

  handleStatusChange = (kittens, currentKitten, currentIndex) => {
    this.setState({
      kittens,
      currentIndex,
      currentKitten,
    });
  }

  updateDisplayFromLocal = () => {
    const sameAsLocal = this.compareStateToLocalStorage();
    if (!sameAsLocal) {
      const { kittens: localKittens, currentIndex: localIndex } = this.getLocalStorage();
      if (localKittens && localIndex >= 0) {
        this.handleStatusChange(localKittens, localKittens[localIndex], localIndex);
      } else this.retrieveKittens();
    }
  }

  componentDidMount = () => this.retrieveKittens();

  retrieveKittens = () => (
    KittenDataService.getAll()
      .then((res) => {
        this.handleStatusChange(res.data, this.defaultKitten, -1);
        return res.data;
      })
      .catch((e) => console.log(e)));

  setActiveKitten = (kitten) => {
    const { kittens } = this.state;
    const index = kittens.findIndex((k) => k.id === kitten.id);
    this.setState({
      currentKitten: kitten,
      currentIndex: index,
    });
    this.setLocalStorage(kittens, index);
  };

  searchName = async (searchTerm) => {
    try {
      const { data: kittens } = await KittenDataService.getAll();
      const search = await KittenDataService.findByName(searchTerm);
      const { message, foundKitten } = search.data;
      console.log(message);
      if (!foundKitten) return;
      const filteredKittens = kittens.filter((e) => e.id === foundKitten.id);
      console.log(filteredKittens[0]);
      this.setState({
        kittens: filteredKittens,
        currentKitten: filteredKittens[0],
        currentIndex: 0,
      });
      this.setLocalStorage(filteredKittens, 0);
    } catch (e) { console.err(e); }
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
        <NavBar
          searchName={this.searchName}
          reset={this.reset}
          updateDisplayFromLocal={this.updateDisplayFromLocal}
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
                retrieveKittens={this.retrieveKittens}
              />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
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
