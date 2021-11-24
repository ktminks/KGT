import React from "react";
import {
  Switch, Route, Link, BrowserRouter, useHistory,
} from "react-router-dom";
import { get } from "../../_utilities";
import { deleteKitten, addKitten } from "../../_services/kittens.service";

const { CurrentKitten, AddKitten, EditKitten } = require("..");

const KittenDisplay = ({
  initKittens, initIndex, initKitten, updateDisplay, saveCurrentKitten,
}) => {
  const [kittens, setKittens] = React.useState(initKittens);
  const [currentIndex, setCurrentIndex] = React.useState(initIndex);
  const [currentKitten, setCurrentKitten] = React.useState(initKitten);
  const history = useHistory();

  const handleSetActive = async (kitten, i) => {
    // get kitten details by id or index (doesn't need to know how) - await
    let index;
    if (!i && kittens) index = kittens.findIndex((k) => k.id === kitten.id);
    else index = i;
    // then set currentKitten and currentIndex
    setCurrentKitten(kitten);
    setCurrentIndex(index);
    saveCurrentKitten(kitten.id);
  };

  const handleRefresh = (index = kittens.length - 1) => {
    console.log(index);
    return index >= 0 ? handleSetActive(kittens[index], index) : updateDisplay();
  };

  const handleDelete = (id) => deleteKitten(id, kittens, setKittens, handleRefresh, history);
  const handleAdd = (data) => {
    addKitten(data, kittens, setKittens, history, handleRefresh);
  };

  // useEffect(() => updateDisplay(), []);

  return (
    <BrowserRouter>
      <div
        className="d-flex justify-content-evenly flex-column-reverse flex-sm-row"
        data-testid="kitten-display"
      >
        <div className="w-100">
          <Switch>
            <Route path="/kittens/add">
              <AddKitten onAddKitten={handleAdd} />
            </Route>
            <Route exact path="/kittens/edit/:id">
              <EditKitten
                currentKitten={currentKitten}
                currentIndex={currentIndex}
                kittens={kittens}
                onRefresh={handleRefresh}
              />
            </Route>
            <Route>
              <CurrentKitten
                currentKitten={currentKitten}
                handleDelete={handleDelete}
              />
            </Route>
          </Switch>
        </div>

        <div>
          <ul className="list-group sticky-top m-2">
            <Link
              to="/kittens/add"
              className="btn btn-danger w-100"
              data-testid="add-button"
            >
              +
            </Link>
            <li className="list-group-item text-center display-6" data-testid="kitten-list">Kittens</li>
            {get.formattedKittens(kittens, handleSetActive, currentIndex, "kittens")}
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default KittenDisplay;
