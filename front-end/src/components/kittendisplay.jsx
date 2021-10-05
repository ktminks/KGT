import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import { CurrentKitten, AddKitten, EditKitten } from "./index";

const KittenDisplay = ({ state, setActiveKitten }) => {
  const history = useHistory();
  let { kittens, currentIndex, currentKitten } = state;

  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    history.push(`/kittens?id=${kitten.id}`);
    console.log(kitten);
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
          <Link to={"/kittens/add"} className="btn btn-danger">
            +
          </Link>
          <li className="list-group-item text-center display-6">Kittens</li>
          {listKittens()}
        </ul>
      </div>
    </div>
  );
};

export default KittenDisplay;
