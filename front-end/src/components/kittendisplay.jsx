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
    <div className="d-flex justify-content-evenly flex-column-reverse flex-sm-row m-auto">
      <div className="m-auto">
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
        kittens={kittens}
        currentIndex={currentIndex}
        setActiveKitten={setActiveKitten}
      />
    </div>
  );
};

export default KittenDisplay;
