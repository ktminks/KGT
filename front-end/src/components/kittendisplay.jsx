import React from "react";
import {
  Switch, Route, Link, useHistory,
} from "react-router-dom";
import { printKittens } from "../_utilities";

const { CurrentKitten, AddKitten, EditKitten } = require(".");

const KittenDisplay = ({ setActiveKitten, state }) => {
  const history = useHistory();
  const { kittens, currentIndex, currentKitten } = state;

  const handleRefresh = (index = kittens.length - 1) => handleSetActive(kittens[index], index);

  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    history.push(`/kittens?id=${kitten.id}`);
  };

  return (
    <div className="d-flex justify-content-evenly flex-column-reverse flex-sm-row">
      <div className="w-100">
        <Switch>
          <Route path="/kittens/add">
            <AddKitten kittens={kittens} onRefresh={handleRefresh} />
          </Route>
          <Route exact path="/kittens/edit/:id">
            <EditKitten
              currentKitten={currentKitten}
              currentIndex={currentIndex}
              kittens={kittens}
              onRefresh={handleRefresh}
            />
          </Route>
          <Route path="/:id">
            <CurrentKitten
              currentKitten={currentKitten}
              currentIndex={currentIndex}
              kittens={kittens}
              onRefresh={handleRefresh}
            />
          </Route>
        </Switch>
      </div>
      <div>
        <ul className="list-group sticky-top m-2">
          <Link to="/kittens/add" className="btn btn-danger">
            +
          </Link>
          <li className="list-group-item text-center display-6">Kittens</li>
          {printKittens(kittens, handleSetActive, currentIndex, "kittens")}
        </ul>
      </div>
    </div>
  );
};

export default KittenDisplay;
