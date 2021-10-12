import React from "react";
import {
  Switch, Route, Link, BrowserRouter,
  // useHistory,
} from "react-router-dom";
import { get } from "../../_utilities";
import KittenDataService from "../../_services/data.service";

const { CurrentKitten, AddKitten, EditKitten } = require("..");

const KittenDisplay = ({
  kittens, currentIndex, currentKitten, setActiveKitten,
}) => {
  // const history = useHistory();
  const handleSetActive = (kitten, index) => {
    setActiveKitten(kitten, index);
    // console.log(kitten);
    // history.push(`/kittens/id=${kitten.id}`);
    KittenDataService.view(kitten.id);
  };

  // console.log(currentKitten);

  const handleRefresh = (index = kittens.length - 1) => handleSetActive(kittens[index], index);

  return (
    <BrowserRouter>
      <div className="d-flex justify-content-evenly flex-column-reverse flex-sm-row" data-testid="kitten-display">
        <div className="w-100">
          <Switch>
            <Route path="/kittens/add">
              <AddKitten
                kittens={kittens}
                onRefresh={handleRefresh}
              />
            </Route>
            <Route exact path="/kittens/edit/:id">
              <EditKitten
                currentKitten={currentKitten}
                currentIndex={currentIndex}
                kittens={kittens}
                onRefresh={handleRefresh}
              />
            </Route>
            {/* <Route path="/:id"> */}
            <Route>
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
          <ul className="list-group sticky-top m-2" data-testid="kittens-list">
            <Link
              to="/kittens/add"
              className="btn btn-danger w-100"
              data-testid="open-add-screen"
            >
              +
            </Link>
            <li className="list-group-item text-center display-6">Kittens</li>
            {get.formattedKittens(kittens, handleSetActive, currentIndex, "kittens")}
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default KittenDisplay;
