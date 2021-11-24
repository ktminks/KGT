import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import {
  NavBar, KittenDisplay, GrowthDisplay, Dashboard, LoginPage, RegisterPage,
} from "./components";
// import getPrevState from "./_services/localStorage.service";
import {
  setActiveKitten, searchKittens, resetKittens, retrieveKittens,
} from "./_services/kittens.service";
import defaultState from "./_utilities/data";

const App = () => {
  const [initKittens, setKittens] = useState(defaultState.initKittens);
  const [initIndex, setCurrentIndex] = useState(0);
  const [initKitten, setCurrentKitten] = useState(defaultState.defaultKitten);

  const handleStatusChange = (newKittens, newCurrentKitten, newIndex) => {
    setKittens(newKittens);
    setCurrentIndex(newIndex);
    setCurrentKitten(newCurrentKitten);
  };

  useEffect(() => retrieveKittens().then((res) => {
    if (res) {
      const { kittens, currentIndex } = res;
      setKittens(kittens);
      setCurrentIndex(currentIndex);
      setCurrentKitten(kittens[0]);
    }
  }), []);

  const updateDisplay = async () => {
    // const prevState = await getPrevState({ initKittens, initKitten, initIndex });
    // // const prevState = false;
    // if (prevState) {
    //   const { kittens, currentIndex } = prevState;
    //   const currentKitten = kittens[currentIndex];
    //   handleStatusChange(kittens, currentKitten, currentIndex);
    // } else setKittens([]);
  };

  const searchName = async (searchTerm) => {
    try {
      const searchResults = await searchKittens(searchTerm);
      if (!searchResults) return null;
      const { foundKittens, foundKitten, foundIndex } = searchResults;
      handleStatusChange(foundKittens, foundKitten, foundIndex);
    } catch (e) { console.err(e); }
    return null;
  };

  return (
    <>
      <NavBar
        searchName={searchName}
        reset={resetKittens}
        updateDisplay={updateDisplay}
      />
      <div className="container mt-3 w-100">
        <Switch>
          <Route path="/growth">
            <GrowthDisplay
              initKittens={initKittens}
              initIndex={initIndex}
              initKitten={initKitten}
              setActiveKitten={setActiveKitten}
            />
          </Route>
          <Route path="/kittens">
            <KittenDisplay
              initKittens={initKittens}
              initIndex={initIndex}
              initKitten={initKitten}
              updateDisplay={updateDisplay}
              saveCurrentKitten={() => {}}
            />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/*">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
