import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as kittenService from "./_services/kittens.service";
// import getPrevState from "./_services/localStorage.service";

import defaultState from "./_utilities/data";
import "bootstrap/dist/css/bootstrap.css";
import "./public/App.css";

import App from "./App";

render(
  <BrowserRouter>
    <App
      kittenService={kittenService}
      defaultState={defaultState}
    />
  </BrowserRouter>,
  document.getElementById("root"),
);
