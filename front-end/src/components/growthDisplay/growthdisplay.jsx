import React from "react";
import {
  Switch, Route, BrowserRouter,
} from "react-router-dom";
import { get } from "../../_utilities";
import { setActiveKitten } from "../../_services/kittens.service";

const { CurrentKittenDev } = require("..");

const GrowthDisplay = ({ kittens, currentIndex, currentKitten }) => {
  const [displayKittens, setKittens] = React.useState(kittens);
  const [displayIndex, setIndex] = React.useState(currentIndex);
  const [displayKitten, setKitten] = React.useState(currentKitten);

  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index, kittens, setKittens, setKitten, setIndex);
  };

  return (
    <BrowserRouter>
      <div
        className="d-flex justify-content-evenly flex-column-reverse flex-sm-row"
        data-testid="growth-display"
      >
        <div className="w-100">
          <Switch>
            <Route path="/:id">
              <CurrentKittenDev currentKitten={displayKitten} />
            </Route>
          </Switch>
        </div>
        <div>
          <ul className="list-group sticky-top m-2">
            <li className="list-group-item text-center display-6">Kittens</li>
            {get.formattedKittens(displayKittens, handleSetActive, displayIndex, "growth")}
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default GrowthDisplay;
