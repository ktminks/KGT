import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
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
    );
  }
}

export default Navbar;
