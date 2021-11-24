import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import {
  NavBar, KittenDisplay, GrowthDisplay, Dashboard, LoginPage, RegisterPage,
} from "./components";
// import getPrevState from "./_services/localStorage.service";
import {
  searchKittens, resetKittens, retrieveKittens, deleteKitten, addKitten, editKitten,
} from "./_services/kittens.service";
import defaultState from "./_utilities/data";

const App = () => {
  const [kittens, setKittens] = useState(defaultState.kittens);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentKitten, setCurrentKitten] = useState(defaultState.defaultKitten);
  const history = useHistory();

  const handleStatusChange = (newKittens, newCurrentKitten, newIndex) => {
    setKittens(newKittens);
    setCurrentIndex(newIndex);
    setCurrentKitten(newCurrentKitten);
  };

  // loads kittens on app initialization
  useEffect(() => retrieveKittens().then((res) => {
    if (res) {
      const { newKittens, newIndex } = res;
      setKittens(newKittens);
      setCurrentIndex(newIndex);
      setCurrentKitten(newKittens[0]);
    }
  }), []);

  // refreshes the page when kittens list changes
  useEffect(() => {}, [kittens]);

  // saves current kitten id to local storage
  const saveCurrentKitten = (id) => {
    console.log(id);
  };

  // sets current kitten based on local storage

  const setActiveKitten = async (kitten, index) => {
    // get kitten details by id or index (doesn't need to know how) - await

    // then set currentKitten and currentIndex
    setCurrentKitten(kitten);
    setCurrentIndex(index);
    saveCurrentKitten(kitten.id);
  };

  const handleAdd = async (data) => {
    await addKitten(data)
      .then((newKitten) => {
        if (newKitten) {
          setActiveKitten(newKitten, kittens.length);
          setKittens([...kittens, newKitten]);
          // retrieveKittens()
          //   .then((res) => (res ? setKittens(res.newKittens) : null));
          history.goBack();
        }
      }).catch((err) => console.error(err));
  };

  const handleDelete = async (id) => {
    await deleteKitten(id)
      .then((success) => {
        if (success) {
          setKittens(kittens.filter((k) => k.id !== id));
          history.push("/kittens");
        }
      }).catch((err) => console.error(err));
  };

  const handleEdit = async (id, data) => {
    const index = kittens.findIndex((k) => k.id === id);
    const kittenToEdit = kittens[index];
    console.log(kittenToEdit);
    await editKitten(kittenToEdit, data)
      .then((editedKitten) => {
        if (editedKitten) {
          const newKittens = [...kittens];
          newKittens[index] = editedKitten;
          setKittens(newKittens);
          setCurrentKitten(editedKitten);
          setActiveKitten(editedKitten, index);
          history.goBack();
        }
      }).catch((err) => console.error(err));
  };

  const handleSearch = async (searchTerm) => {
    try {
      const searchResults = await searchKittens(searchTerm);
      if (!searchResults) return null;
      const { foundKittens, foundKitten, foundIndex } = searchResults;
      handleStatusChange(foundKittens, foundKitten, foundIndex);
    } catch (e) { console.err(e); }
    return null;
  };
  const handleReset = async () => resetKittens();

  return (
    <>
      <NavBar
        handleSearch={handleSearch}
        reset={handleReset}
      />
      <div className="container mt-3 w-100">
        <Switch>
          <Route path="/growth">
            <GrowthDisplay
              kittens={kittens}
              currentIndex={currentIndex}
              currentKitten={currentKitten}
              handleSetActive={setActiveKitten}
            />
          </Route>
          <Route path="/kittens">
            <KittenDisplay
              kittens={kittens}
              currentIndex={currentIndex}
              currentKitten={currentKitten}
              handleSetActive={setActiveKitten}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              history={history}
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
