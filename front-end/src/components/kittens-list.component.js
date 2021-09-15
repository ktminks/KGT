import React, { Component } from "react";
import KittenDataService from "../services/data.service";
import { Link } from "react-router-dom";

export default class KittensList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveKittens = this.retrieveKittens.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveKitten = this.setActiveKitten.bind(this);
    this.removeAllKittens = this.removeAllKittens.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      kittens: [],
      currentKitten: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveKittens();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveKittens() {
    KittenDataService.getAll()
      .then(response => {
        this.setState({
          kittens: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveKittens();
    this.setState({
      currentKitten: null,
      currentIndex: -1
    });
  }

  setActiveKitten(kitten, index) {
    this.setState({
      currentKitten: kitten,
      currentIndex: index
    });
  }

  removeAllKittens() {
    KittenDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    KittenDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          kittens: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

 render() {
    const { searchName, kittens, currentKitten, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Kittens List</h4>

          <ul className="list-group">
            {kittens &&
              kittens.map((kitten, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveKitten(kitten, index)}
                  key={index}
                >
                  {kitten.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllKittens}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentKitten ? (
            <div>
              <h4>Kitten</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentKitten.name}
              </div>
              <div>
                <label>
                  <strong>Gender:</strong>
                </label>{" "}
                {currentKitten.gender}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentKitten.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/kittens/" + currentKitten.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Kitten...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}