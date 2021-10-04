import React, { useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import { CurrentKittenGrowth } from "./index";

const GrowthDisplay = ({ state, setActiveKitten }) => {
  const history = useHistory();
  let { kittens, currentIndex, currentKitten } = state;

  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    history.push(`/growth?id=${kitten.id}`);
  };

  const getKitten = (kitten, index) => {
    return (
      <li
        className={
          "list-group-item " + (index === currentIndex ? "active" : "")
        }
        onClick={() => handleSetActive(kitten, index)}
        key={index}
      >
        {kitten.name}
      </li>
    );
  };

  const listKittens = () => kittens && kittens.map(getKitten);

  return (
    <div className="d-flex justify-content-evenly flex-column-reverse flex-sm-row m-auto">
      <div className="m-auto">
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
      <div className="sw-50 w-25">
        <h4>Kittens List</h4>

        <ul className="list-group">
          <Link to={"/add"} className="btn btn-danger">
            +
          </Link>
          {listKittens()}
        </ul>
      </div>
    </div>
  );
};

export default GrowthDisplay;
