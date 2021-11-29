import React from "react";
import {
  Switch, Route, BrowserRouter,
} from "react-router-dom";
import KittenList from "../kittenList";
import CurrentKittenDev from "./currentkittendev";

const GrowthDisplay = ({ kittens, currentIndex, handleSetActive }) => (
  <BrowserRouter>
    <div
      className="d-flex justify-content-evenly flex-column-reverse flex-sm-row"
      data-testid="growth-display"
    >
      <div className="w-100">
        <Switch>
          <Route>
            <CurrentKittenDev currentKitten={kittens[currentIndex]} />
          </Route>
        </Switch>
      </div>
      <div>
        <ul className="list-group sticky-top m-2" data-testid="kitten-list-growth">
          <li className="list-group-item text-center display-6">Kittens</li>
          <KittenList
            kittens={kittens}
            handleSetActive={handleSetActive}
            currentIndex={currentIndex}
          />
        </ul>
      </div>
    </div>
  </BrowserRouter>
);

export default GrowthDisplay;
