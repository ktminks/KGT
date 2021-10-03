import React from "react";
import { Link } from "react-router-dom";
import SearchKittens from "./search";

const Navbar = ({ searchName }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/kittens"} className="navbar-brand ms-2">
          myClowder
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
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
        </div>
        <SearchKittens searchName={searchName} />
      </div>
    </nav>
  );
};

export default Navbar;
