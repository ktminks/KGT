import React from "react";
import {
  Switch, Route, BrowserRouter,
} from "react-router-dom";
import { get } from "../../_utilities";
import KittenDataService from "../../_services/data.service";

const { CurrentKittenDev } = require("..");

const GrowthDisplay = ({
  kittens, currentIndex, currentKitten, setActiveKitten,
}) => {
  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    // console.log(kitten);
    KittenDataService.view(kitten.id);
  };

  return (
    <BrowserRouter>
      <div className="d-flex justify-content-evenly flex-column-reverse flex-sm-row">
        <div className="w-100">
          <Switch>
            <Route path="/:id">
              <CurrentKittenDev currentKitten={currentKitten} />
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
};

export default GrowthDisplay;
