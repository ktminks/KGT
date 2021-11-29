import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import {
  NavBar, KittenDisplay, GrowthDisplay, Dashboard, LoginPage, RegisterPage,
} from "./components";
import KittenDataService from "./_services/data.service";
import getPrevState from "./_services/localStorage.service";
import setActiveKitten, { searchKittens } from "./_services/kittens.service";
import defaultState from "./_utilities/data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleStatusChange = (kittens, currentKitten, currentIndex) => {
    // eslint-disable-next-line no-param-reassign
    if (!kittens) ({ kittens } = this.state);
    this.setState({
      kittens,
      currentIndex,
      currentKitten,
    });
  }

  updateDisplay = () => {
    const prevState = getPrevState(this.state);
    if (prevState) {
      // destructure kittens, currentIndex, currentKitten
      // set state from local storage
    }
    // otherwise, retrieveKittens
    const sameAsLocal = this.compareStateToLocalStorage();
    if (!sameAsLocal) {
      const { kittens: localKittens, currentIndex: localIndex } = this.getLocalStorage();
      if (localKittens && localIndex >= 0) {
        this.handleStatusChange(localKittens, localKittens[localIndex], localIndex);
      } else {
        this.retrieveKittens();
      }
    }
  }

  componentDidMount = () => this.retrieveKittens();

  retrieveKittens = () => (
    KittenDataService.getAll()
      .then((res) => {
        this.handleStatusChange(res.data, this.defaultKitten, -1);
        return res.data;
      })
      .catch((e) => console.error(e)));

  setActiveKitten = (kitten, index = null) => {
    const { kittens } = this.state;
    setActiveKitten(kitten, kittens, index);
  };

  searchName = async (searchTerm) => {
    try {
      const { data: kittens } = await KittenDataService.getAll();
      const search = await KittenDataService.findByName(searchTerm);
      const { message, foundKitten } = search.data;
      console.log(message);
      if (!foundKitten) return;
      const filteredKittens = kittens.filter((e) => e.id === foundKitten.id);

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
      .then(() => this.setActiveKitten(currentKitten));
  };

  render() {
    const { kittens, currentIndex, currentKitten } = this.state;

    return (
      <>
        <NavBar
          searchName={this.searchName}
          reset={this.reset}
          updateDisplay={this.updateDisplay}
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
      </>
    );
  }
}
export default App;
