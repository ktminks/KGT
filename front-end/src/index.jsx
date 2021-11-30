import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as kittenService from "./_services/kittens.service";
import useAuthStatus from "./_services/auth.service";
// import getPrevState from "./_services/localStorage.service";

import { kittens } from "./_utilities/data";
import "bootstrap/dist/css/bootstrap.css";
import "./public/App.css";

import Home from "./Home";

const App = () => (
  <BrowserRouter>
    <Home
      kittenService={kittenService}
      defaultKittens={kittens}
      useAuthStatus={useAuthStatus}
    />
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
