import React from "react";
import {
  Switch, Route, BrowserRouter,
} from "react-router-dom";
import { get } from "../../_utilities";

const { CurrentKittenDev } = require("..");

const GrowthDisplay = ({ kittens, currentIndex, handleSetActive }) => (
  <BrowserRouter>
    <div
      className="d-flex justify-content-evenly flex-column-reverse flex-sm-row"
      data-testid="growth-display"
    >
      <div className="w-100">
        <Switch>
          <Route path="/:id">
            <CurrentKittenDev currentKitten={kittens[currentIndex]} />
          </Route>
        </Switch>
      </div>
      <div>
        <ul className="list-group sticky-top m-2">
          <li className="list-group-item text-center display-6">Kittens</li>
          {get.formattedKittens(kittens, handleSetActive, currentIndex, "growth")}
        </ul>
      </div>
    </div>
  </BrowserRouter>
);

export default GrowthDisplay;
