import React, { useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import { CurrentKitten, AddKitten, EditKitten } from "./index";

const KittenDisplay = ({ state, setActiveKitten }) => {
  const history = useHistory();
  let { kittens, currentIndex, currentKitten } = state;
  const [kittensList, fetchData] = useState(kittens);

  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    history.push(`/kittens?id=${kitten.id}`);
  };

  const handleRefresh = (type, index = kittens.length - 1) => {
    switch (type) {
      case "delete":
      case "add":
        const newKitten = kittens[index];
        handleSetActive(newKitten, index);
        break;
      case "edit":
        handleSetActive(kittens[index], index);
        break;
    }
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
      <div className="m-auto w-100">
        <Switch>
          <Route path="/add">
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
      <div className="sw-50 w-25">
        <h4>Kittens List</h4>

        <ul className="list-group sticky-top">
          <Link to={"/add"} className="btn btn-danger">
            +
          </Link>
          {listKittens()}
        </ul>
      </div>
    </div>
  );
};

export default KittenDisplay;
