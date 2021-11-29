import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import {
  NavBar, KittenDisplay, GrowthDisplay, Dashboard, LoginPage, RegisterPage,
} from "./components";

const Home = ({ kittenService, defaultState }) => {
  const [kittens, setKittens] = useState(defaultState.kittens);
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();
  const alert = useAlert();
  const {
    searchKittens, retrieveKittens, deleteKitten, addKitten, editKitten,
  } = kittenService;

  // loads kittens on app initialization
  useEffect(() => retrieveKittens().then((res) => {
    if (res) {
      const { newKittens, newIndex } = res;
      setKittens(newKittens);
      setCurrentIndex(newIndex);
    }
  }), [retrieveKittens]);

  // refreshes the page when kittens list changes
  useEffect(() => {}, [kittens]);

  // saves current kitten id to local storage
  const saveCurrentKitten = (id) => {
    if (id) console.log("Placeholder for handling local storage");
  };

  // sets current kitten based on local storage

  const setActiveKitten = async (id, index) => {
    // get kitten details by id or index (doesn't need to know how) - await

    // then set currentKitten and currentIndex
    // const kitten = kittens.find((kitten) => kitten.id === id);
    setCurrentIndex(index);
    saveCurrentKitten(id);
  };

  const handleAdd = async (data) => {
    await addKitten(data)
      .then((newKitten) => {
        if (newKitten) {
          setActiveKitten(newKitten.id, kittens.length);
          setKittens([...kittens, newKitten]);
          // retrieveKittens()
          //   .then((res) => (res ? setKittens(res.newKittens) : null));
          alert.success("Kitten added successfully!");
          history.goBack();
        }
      }).catch((err) => alert.error(err));
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
          setActiveKitten(id, index);
          history.goBack();
        }
      }).catch((err) => console.error(err));
  };

  const handleSearch = async (searchTerm) => {
    searchKittens(searchTerm)
      .then((searchResults) => {
        if (!searchResults) return null;
        const { foundKittens, foundKitten, foundIndex } = searchResults;
        setKittens(foundKittens);
        setCurrentIndex(foundIndex);
        return foundKitten;
      }).catch((e) => { console.err(e); });
    return null;
  };
  // const handleReset = async () => resetKittens();

  return (
    <>
      <NavBar
        handleSearch={handleSearch}
        // reset={handleReset}
      />
      <div className="container mt-3 w-100">
        <Switch>
          <Route path="/growth">
            <GrowthDisplay
              kittens={kittens}
              currentIndex={currentIndex}
              handleSetActive={setActiveKitten}
            />
          </Route>
          <Route path="/kittens">
            <KittenDisplay
              kittens={kittens}
              currentIndex={currentIndex}
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

export default Home;
