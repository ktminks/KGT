import React from "react";
import { Navbar as nav } from "bootstrap";
import { Link } from "react-router-dom";
import SearchKittens from "./search";

const Navbar = ({ searchName }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/kittens"} className="navbar-brand ms-2">
          myClowder
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/kittens"} className="nav-link">
                Kittens
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/growth"} className="nav-link">
                Growth
              </Link>
            </li>
          </ul>
          <SearchKittens searchName={searchName} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
