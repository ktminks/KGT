import React from "react";
import {
  Switch, Route, Link, BrowserRouter,
} from "react-router-dom";
import { get } from "../../_utilities";

const { CurrentKitten, AddKitten, EditKitten } = require("..");

const KittenDisplay = ({
  kittens, currentIndex, handleSetActive, handleAdd, handleDelete, handleEdit, history,
}) => (
  <BrowserRouter>
    <div
      className="d-flex justify-content-evenly flex-column-reverse flex-sm-row"
      data-testid="kitten-display"
    >
      <div className="w-100">
        <Switch>
          <Route path="/kittens/add">
            <AddKitten
              onAddKitten={handleAdd}
              history={history}
            />
          </Route>
          <Route exact path="/kittens/edit/:id">
            <EditKitten
              currentKitten={kittens[currentIndex]}
              handleEdit={handleEdit}
              history={history}
            />
          </Route>
          <Route>
            <CurrentKitten
              currentKitten={kittens[currentIndex]}
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

export default KittenDisplay;
