import React from "react";
import {
  Switch, Route, useHistory, BrowserRouter,
} from "react-router-dom";
import { get } from "../../_utilities";

const { CurrentKittenDev } = require("..");

const GrowthDisplay = ({
  kittens, currentIndex, currentKitten, setActiveKitten,
}) => {
  const history = useHistory();

  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    // console.log(kitten);
    history.push(`/growth?id=${kitten.id}`);
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
