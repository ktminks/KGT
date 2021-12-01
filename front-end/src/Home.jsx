import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import {
  NavBar, KittenDisplay, GrowthDisplay, Dashboard, LoginPage, RegisterPage,
} from "./components";

const Home = ({ kittenService, defaultKittens, useAuthStatus }) => {
  const [kittens, setKittens] = useState(defaultKittens);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const history = useHistory();
  const { searchKittens, deleteKitten, addKitten } = kittenService;
  const { editKitten, resetKittens, getKittenIndex } = kittenService;

  // loads kittens on app initialization
  useEffect(() => kittenService.retrieveKittens()
    .then((res) => {
      if (res) {
        // const { newKittens, newIndex } = res;
        const { newKittens } = res;
        setKittens(newKittens);
        // if (currentIndex < 0) setCurrentIndex(newIndex);
      }
    }), [kittenService]);
  // }), [retrieveKittens, currentIndex]);

  // refreshes the page when kittens list or active kitten changes
  // useEffect(() => console.log(currentIndex), [kittens, currentIndex]);

  // saves current kitten id to local storage
  // const saveCurrentKitten = (id) => {
  //   if (id) console.log("Placeholder for handling local storage");
  // };

  // sets current kitten based on local storage

  const setActiveKitten = async (id, i = -1) => {
    // get kitten details by id or index (doesn't need to know how) - await
    console.log(kittens);
    const kittenIndex = i >= 0 ? i : await getKittenIndex(id, kittens);
    // const i = index > -1 ? index : ;
    // then set currentKitten and currentIndex
    // const kitten = kittens.find((kitten) => kitten.id === id);
    setCurrentIndex(kittenIndex);
    // saveCurrentKitten(id);
  };

  const handleAdd = async (data) => {
    try {
      const newKitten = await addKitten(data);
      if (newKitten) {
        await setActiveKitten(newKitten.id, kittens.length);
        setKittens([...kittens, newKitten]);
        history.goBack();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => deleteKitten(id)
    .then((success) => {
      if (success) {
        setKittens(kittens.filter((k) => k.id !== id));
        history.push("/kittens");
      }
    }).catch((err) => console.error(err));

  const handleEdit = async (id, data) => {
    try {
      const index = kittens.findIndex((k) => k.id === id);
      const kittenToEdit = kittens[index];
      console.log(kittenToEdit);
      const editedKitten = await editKitten(kittenToEdit, data);
      if (editedKitten) {
        const newKittens = [...kittens];
        newKittens[index] = editedKitten;
        setKittens(newKittens);
        await setActiveKitten(id, index);
        history.goBack();
      }
    } catch (err) { console.error(err); }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const { foundKittens } = await searchKittens(searchTerm);
      setKittens(foundKittens);
      if (foundKittens[0]) await setActiveKitten(foundKittens[0].id, 0);
    } catch (err) { console.error(err); }
  };

  const handleReset = async (id = kittens[currentIndex].id) => {
    try {
      // console.log(kitten);
      const { newKittens } = await resetKittens();
      setKittens(newKittens);
      const index = await getKittenIndex(id);
      await setActiveKitten(id, index);
    } catch (err) { console.error(err); }
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
