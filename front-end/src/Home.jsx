import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import {
  NavBar, KittenDisplay, GrowthDisplay, Dashboard, LoginPage, RegisterPage,
} from "./components";

const Home = ({ kittenService, defaultKittens, useAuthStatus }) => {
  const [kittens, setKittens] = useState(defaultKittens);
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();
  const {
    searchKittens, retrieveKittens, deleteKitten, addKitten, editKitten, resetKittens,
  } = kittenService;

  // loads kittens on app initialization
  useEffect(() => retrieveKittens()
    .then((res) => {
      if (res) {
        const { newKittens, newIndex } = res;
        setKittens(newKittens);
        setCurrentIndex(newIndex);
      }
    }), [retrieveKittens]);

  // refreshes the page when kittens list or active kitten changes
  // useEffect(() => console.log(currentIndex), [kittens, currentIndex]);

  // saves current kitten id to local storage
  // const saveCurrentKitten = (id) => {
  //   if (id) console.log("Placeholder for handling local storage");
  // };

  // sets current kitten based on local storage

  const setActiveKitten = (id, index = -1) => {
    // get kitten details by id or index (doesn't need to know how) - await
    const i = index > -1 ? index : kittens.findIndex((kitten) => kitten.id === id);
    // then set currentKitten and currentIndex
    // const kitten = kittens.find((kitten) => kitten.id === id);
    // console.log(i);
    setCurrentIndex(i);
    // saveCurrentKitten(id);
  };

  const handleAdd = (data) => addKitten(data)
    .then((newKitten) => {
      if (newKitten) {
        setActiveKitten(newKitten.id, kittens.length);
        setKittens([...kittens, newKitten]);
        history.goBack();
      }
    }).catch((err) => console.error(err));

  const handleDelete = (id) => deleteKitten(id)
    .then((success) => {
      if (success) {
        setKittens(kittens.filter((k) => k.id !== id));
        history.push("/kittens");
      }
    }).catch((err) => console.error(err));

  const handleEdit = (id, data) => {
    const index = kittens.findIndex((k) => k.id === id);
    const kittenToEdit = kittens[index];
    console.log(kittenToEdit);
    editKitten(kittenToEdit, data)
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

  const handleSearch = (searchTerm) => {
    searchKittens(searchTerm)
      .then(({ foundKittens }) => {
        setKittens(foundKittens);
        return foundKittens;
      })
      .then((foundKittens) => (
        foundKittens[0] ? setActiveKitten(foundKittens[0].id, 0) : null))
      .catch((err) => { console.error(err); });
  };

  const handleReset = () => {
    const kitten = kittens[currentIndex];
    // console.log(kitten);
    resetKittens()
      .then((newKittens) => setKittens(newKittens))
      .then(() => setActiveKitten(kitten.id))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <NavBar
        handleSearch={handleSearch}
        handleReset={handleReset}
        useAuthStatus={useAuthStatus}
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
