import React, { useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import { CurrentKitten, AddKitten, EditKitten } from "./index";

const GrowthDisplay = ({ state, setActiveKitten }) => {
  const history = useHistory();
  let { kittens, currentIndex, currentKitten } = state;
  const [kittensList, fetchData] = useState(kittens);

  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    history.push(`/kittens?id=${kitten.id}`);
  };

  const listKittens = () => {
    if (kittens !== kittensList) {
      fetchData(kittens);
    }
    return (
      kittens &&
      kittens.map((kitten, index) => (
        <li
          className={
            "list-group-item " + (index === currentIndex ? "active" : "")
          }
          onClick={() => handleSetActive(kitten, index)}
          key={index}
        >
          {kitten.name}
        </li>
      ))
    );
  };

  return (
    <div className="d-flex justify-content-evenly flex-column-reverse flex-sm-row m-auto">
      <div className="m-auto">
        <Switch>
          <Route path="/:id">
            <CurrentKitten
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
