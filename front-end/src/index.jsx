import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import * as kittenService from "./_services/kittens.service";
// import getPrevState from "./_services/localStorage.service";

import defaultState from "./_utilities/data";
import "bootstrap/dist/css/bootstrap.css";
import "./public/App.css";

const options = {
  timeout: 2000,
  position: positions.BOTTOM_CENTER,
};

const App = () => (
  <BrowserRouter>
    <Provider template={AlertTemplate} options={options}>
      <App
        kittenService={kittenService}
        defaultState={defaultState}
      />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

render(<App />, document.getElementById("root"));
