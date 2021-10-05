import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { CurrentKittenGrowth } from "./index";

const GrowthDisplay = ({ state, setActiveKitten }) => {
  const history = useHistory();
  let { kittens, currentIndex, currentKitten } = state;

  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    history.push(`/growth?id=${kitten.id}`);
    console.log(kitten);
  };

  const printKitten = (kitten, index) => {
    const currentClass = `list-group-item list-group-item-action ${
      index === currentIndex ? "active" : ""
    }`;
    return (
      <li
        className={currentClass}
        onClick={() => handleSetActive(kitten, index)}
        key={index}
      >
        {kitten.name}
      </li>
    );
  };

  const listKittens = () => kittens && kittens.map(printKitten);

  return (
    <div className="d-flex justify-content-evenly flex-column-reverse flex-sm-row">
      <div className="w-100">
        <Switch>
          <Route path="/:id">
            <CurrentKittenGrowth
              currentKitten={currentKitten}
              currentIndex={currentIndex}
              kittens={kittens}
            />
          </Route>
        </Switch>
      </div>
      <div>
        <ul className="list-group sticky-top m-2">
          <li className="list-group-item text-center display-6">Kittens</li>
          {listKittens()}
        </ul>
      </div>
    </div>
  );
};

export default GrowthDisplay;
