import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Navbar as nav } from "bootstrap";
import { Link } from "react-router-dom";
import SearchKittens from "./search";
import KittenDataService from "../../_services/data.service";

const Navbar = ({ searchName, reset }) => {
  const [isLoggedIn, setLoggedIn] = useState({ data: false });
  const loggedIn = async () => {
    try {
      const result = await KittenDataService.isLoggedIn();
      if (result) {
        // console.log(result.data);
        return result;
      }
    } catch (err) { console.log(err); }
    return { data: false };
  };

  useEffect(() => {
    loggedIn().then((res) => {
      setLoggedIn(res);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  // console.log(isLoggedIn);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand ms-2">
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
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/kittens" className="nav-link">
                Kittens
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/growth" className="nav-link">
                Growth
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                {isLoggedIn.data
                  ? (
                  // <Link to="/auth/logout" className="nav-link">
                  //   Logout
                  // </Link>
                    `Hi, ${isLoggedIn.data}!`
                  )
                  : (
                    "Login"
                  )}
              </Link>
            </li>
          </ul>
          <SearchKittens searchName={searchName} reset={reset} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
