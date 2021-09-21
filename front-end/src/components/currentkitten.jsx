import React, { Component } from "react";
import { Link } from "react-router-dom";

class CurrentKitten extends Component {
  render() {
    const { currentKitten, deleteKitten } = this.props;
    return (
      <div>
        {currentKitten.name ? (
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
                <strong>Age:</strong>
              </label>{" "}
            </div>
            <div className="d-flex justify-content-evenly">
              <Link
                to={"/kittens/" + currentKitten.id}
                className="btn btn-warning w-75 m-1"
              >
                Edit
              </Link>

              <button
                className="btn btn-danger m-1 w-75"
                onClick={deleteKitten}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p>Please click on a Kitten...</p>
        )}
      </div>
    );
  }
}

export default CurrentKitten;
