import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Home from "./Home";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

const App = () => (
  <BrowserRouter>
    <Provider template={AlertTemplate} options={options}>
      <Home />
    </Provider>
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
