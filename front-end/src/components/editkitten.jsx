import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EditKitten extends Component {
  componentWillUnmount() {}

  render() {
    const {
      currentKitten,
      deleteKitten,
      updateKitten,
      onChangeGender,
      onChangeName,
    } = this.props;

    return (
      <div className="m-2">
        <h4>Kitten</h4>
        <form>
          <div className="input-group">
            <span className="input-group-text" htmlFor="name">
              Name:
            </span>
            <input
              type="text"
              className="form-control"
              id="name"
              value={currentKitten.name}
              onChange={onChangeName}
            />
          </div>
          <div className="input-group">
            <span className="input-group-text" htmlFor="gender">
              Gender
            </span>
            <input
              type="text"
              className="form-control"
              id="gender"
              value={currentKitten.gender}
              onChange={onChangeGender}
            />
          </div>

          <div className="input-group">
            <span className="input-group-text">Age:</span>
            <input type="number" className="form-control" id="age" />
          </div>
        </form>

        <div className="d-flex justify-content-evenly">
          <Link to="/" className="btn btn-secondary w-50 m-1">
            Back
          </Link>

          <button
            type="submit"
            className="btn btn-success w-50 m-1"
            onClick={updateKitten}
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}
