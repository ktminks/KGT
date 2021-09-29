import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { KittenList, CurrentKitten, AddKitten, EditKitten } from "./index";
import KittenDataService from "../_services/data.service";

const KittenDisplay = ({ state, setActiveKitten, retrieveKittens }) => {
  let { kittens, currentIndex, currentKitten } = state;
  const [kittensList, fetchData] = React.useState(kittens);

  const onRefresh = (kittens) => handleRefresh(kittens);
  // retrieveKittens = () => {
  //   KittenDataService.getAll()
  //     .then((response) => {
  //       kittens = response.data;
  //       fetchData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((e) => console.log(e));
  // };

  // useEffect(() => {
  //   console.log("Kitten Display refreshed the DOM");
  //   fetchData(retrieveKittens());
  // }),
  //   [];

  return (
    <div className="d-flex flex-column w-75 m-auto">
      <div className="d-flex justify-content-evenly">
        <div className="w-75 m-auto">
          <Switch>
            <Route path="/kittens/:id">
              <EditKitten
                currentKitten={currentKitten}
                kittens={kittens}
                onRefresh={onRefresh}
              />
            </Route>
            <Route path="/add">
              <AddKitten kittens={kittens} />
            </Route>
            <Route path="/">
              <CurrentKitten
                currentKitten={currentKitten}
                kittens={kittens}
                onRefresh={onRefresh}
              />
            </Route>
          </Switch>
        </div>
        <KittenList
          kittens={kittens}
          currentIndex={currentIndex}
          setActiveKitten={setActiveKitten}
          handleRefresh={onRefresh}
        />
      </div>
    </div>
  );
};

export default KittenDisplay;
