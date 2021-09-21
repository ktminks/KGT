import React, { Component } from "react";
import { Link } from "react-router-dom";
import KittenDataService from "../services/data.service";

export default class AddKitten extends Component {
  state = {
    id: null,
    name: "",
    gender: "",
  };

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeGender = (e) => {
    this.setState({
      gender: e.target.value,
    });
  };

  saveKitten = () => {
    var data = {
      name: this.state.name,
      gender: this.state.gender,
    };

    KittenDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          gender: response.data.gender,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  newKitten = () => {
    this.setState({
      id: null,
      name: "",
      gender: "",
    });
  };

  render() {
    const {} = this.props;

    return (
      <div className="m-2">
        <div>
          <div className="input-group">
            <span className="input-group-text" htmlFor="name">
              Name
            </span>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={this.state.name}
              onChange={this.onChangeName}
              name="name"
            />
          </div>

          <div className="input-group mt-2">
            <span className="input-group-text" htmlFor="gender">
              Gender
            </span>
            <input
              type="text"
              className="form-control"
              id="gender"
              required
              value={this.state.gender}
              onChange={this.onChangeGender}
              name="gender"
            />
          </div>

          <div className="d-flex justify-content-evenly mt-2">
            <Link to="/" className="btn btn-secondary w-75 m-1">
              Back
            </Link>
            <button
              onClick={this.saveKitten}
              className="btn btn-success w-75 m-1"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
