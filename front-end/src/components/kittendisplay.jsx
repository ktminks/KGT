import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { KittenList, CurrentKitten, AddKitten, EditKitten } from "./index";

const KittenDisplay = ({ state, setActiveKitten, retrieveKittens }) => {
  const { kittens, currentIndex, currentKitten } = state;
  // const [kittens, updateKittens] = React.useState([state.kittens]);
  useEffect(() => {
    console.log("Kitten Display refreshed the DOM");
  });

  return (
    <div className="d-flex justify-content-evenly mw-50 m-auto">
      <div className="m-auto flex-grow-1">
        <Switch>
          <Route path="/kittens/:id">
            <EditKitten currentKitten={currentKitten} />
          </Route>
          <Route path="/add">
            <AddKitten />
          </Route>
          <Route path="/">
            <CurrentKitten
              currentKitten={currentKitten}
              retrieveKittens={retrieveKittens}
            />
          </Route>
        </Switch>
      </div>
      <KittenList
        className="flex-grow-1"
        kittens={kittens}
        currentIndex={currentIndex}
        setActiveKitten={setActiveKitten}
      />
    </div>
  );
};

export default KittenDisplay;
