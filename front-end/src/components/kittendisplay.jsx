import React from "react";
import { Switch, Route } from "react-router-dom";

import KittenList from "./kittenlist";
import CurrentKitten from "./currentkitten";
import AddKitten from "./add-kitten";
import EditKitten from "./editkitten";

const KittenDisplay = ({ state, setActiveKitten }) => {
  const { kittens, currentIndex, currentKitten } = state;
  return (
    <div className="d-flex flex-column w-75 m-auto">
      <div className="d-flex justify-content-evenly">
        <div className="w-75 m-auto">
          <Switch>
            <Route path="/kittens/:id">
              <EditKitten currentKitten={currentKitten} />
            </Route>
            <Route path="/add">
              <AddKitten />
            </Route>
            <Route path="/">
              <CurrentKitten currentKitten={currentKitten} />
            </Route>
          </Switch>
        </div>
        <KittenList
          kittens={kittens}
          currentIndex={currentIndex}
          setActiveKitten={setActiveKitten}
        />
      </div>
    </div>
  );
};

export default KittenDisplay;
