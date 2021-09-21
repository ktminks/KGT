import React, { Component } from "react";
import KittenDataService from "../services/data.service";
import { Switch, Route, Link } from "react-router-dom";

import KittenList from "./kittenlist";
import CurrentKitten from "./currentkitten";
import SearchKittens from "./search";
import AddKitten from "./add-kitten";
import EditKitten from "./editkitten";

export default class KittenDisplay extends Component {
  state = {
    kittens: [],
    currentIndex: -1,
    searchName: "",
    currentKitten: {
      id: null,
      name: "",
      gender: "",
    },
    message: "",
  };

  componentDidMount() {
    this.retrieveKittens();
  }

  onChangeName = (e) => {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentKitten: {
          ...prevState.currentKitten,
          name: name,
        },
      };
    });
  };

  onChangeGender = (e) => {
    const gender = e.target.value;

    this.setState((prevState) => ({
      currentKitten: {
        ...prevState.currentKitten,
        gender: gender,
      },
    }));
  };

  getKitten = (id) => {
    KittenDataService.get(id)
      .then((response) => {
        this.setState({
          currentKitten: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  updateKitten = () => {
    KittenDataService.update(
      this.state.currentKitten.id,
      this.state.currentKitten
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The kitten was updated successfully!",
        });
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteKitten = () => {
    KittenDataService.delete(this.state.currentKitten.id)
      .then((response) => {
        console.log(response.data);
        // this.props.history.push("/kittens");
        // this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  onChangeSearchName = (e) => {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  };

  retrieveKittens = () => {
    KittenDataService.getAll()
      .then((response) => {
        this.setState({
          kittens: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  refreshList() {
    this.retrieveKittens();
    this.setState({
      currentKitten: null,
      currentIndex: -1,
    });
  }

  setActiveKitten = (kitten, index) => {
    this.setState({
      currentKitten: kitten,
      currentIndex: index,
    });
  };

  searchName = () => {
    KittenDataService.findByName(this.state.searchName)
      .then((response) => {
        this.setState({
          kittens: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { searchName, kittens, currentKitten, currentIndex } = this.state;

    return (
      <div className="list d-flex flex-column justify-content-center w-75">
        <SearchKittens
          searchName={searchName}
          onSearch={this.searchName}
          onChange={this.onChangeSearchName}
        />
        <div className="d-flex w-100 justify-content-between">
          <div className="w-75 m-2">
            <Switch>
              <Route path="/add">
                <AddKitten refresh={this.refreshList} />
              </Route>
              <Route path="/kittens/:id">
                <EditKitten
                  currentKitten={currentKitten}
                  deleteKitten={this.deleteKitten}
                  updateKitten={this.updateKitten}
                  getKitten={this.getKitten}
                  onChangeGender={this.onChangeGender}
                  onChangeName={this.onChangeName}
                />
              </Route>
              <Route>
                <CurrentKitten
                  currentKitten={currentKitten}
                  deleteKitten={this.deleteKitten}
                />
              </Route>
            </Switch>
          </div>
          <KittenList
            kittens={kittens}
            currentIndex={currentIndex}
            setActiveKitten={this.setActiveKitten}
          />
        </div>
      </div>
    );
  }
}
