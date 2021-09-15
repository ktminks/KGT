import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./public/bootstrap.min.css";
import "./public/App.css";

import AddKitten from "./components/add-kitten.component";
import Kitten from "./components/kitten.component";
import KittensList from "./components/kittens-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/kittens" className="navbar-brand ms-2">
            myClowder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/kittens"} className="nav-link">
                Kittens
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/kittens"]} component={KittensList} />
            <Route exact path="/add" component={AddKitten} />
            <Route path="/kittens/:id" component={Kitten} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
