import React, { Component } from "react";
import { Link } from "react-router-dom";

class KittenList extends Component {
  render() {
    const { kittens, currentIndex, setActiveKitten } = this.props;

    return (
      <div className="w-25 m-2">
        <h4>Kittens List</h4>

        <ul className="list-group">
          <Link to={"/add"} className="btn btn-danger">
            +
          </Link>
          {kittens &&
            kittens.map((kitten, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveKitten(kitten, index)}
                key={index}
              >
                {kitten.name}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default KittenList;
