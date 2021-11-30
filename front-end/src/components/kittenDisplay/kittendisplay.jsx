import React from "react";
import {
  Switch, Route, Link, BrowserRouter,
} from "react-router-dom";
import KittenList from "../kittenList";
import AddKitten from "./add-kitten";
import EditKitten from "./edit-kitten";
import CurrentKitten from "./current-kitten";

// refreshes the page when kittens list or active kitten changes
// useEffect(() => { }, [kittens, currentIndex]);

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
        <ul className="list-group sticky-top m-2" data-testid="kitten-list">
          <Link
            to="/kittens/add"
            className="btn btn-danger w-100"
            data-testid="add-button"
          >
            +
          </Link>
          <li className="list-group-item text-center display-6">Kittens</li>
          <KittenList
            kittens={kittens}
            handleSetActive={handleSetActive}
            currentIndex={currentIndex}
          />
        </ul>
      </div>
    </div>
  </BrowserRouter>
);
export default KittenDisplay;
