import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { printKittens } from "../../_utilities";

const { CurrentKittenDev } = require("..");

const GrowthDisplay = ({
  kittens, currentIndex, currentKitten, setActiveKitten,
}) => {
  const history = useHistory();

  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    console.log(kitten);
    history.push(`/growth?id=${kitten.id}`);
  };

  return (
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
          {printKittens(kittens, handleSetActive, currentIndex, "growth")}
        </ul>
      </div>
    </div>
  );
};

export default GrowthDisplay;
