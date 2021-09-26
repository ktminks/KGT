import React from "react";
import { Link } from "react-router-dom";

const KittenList = ({ kittens, currentIndex, setActiveKitten }) => {
  // componentDidUpdate(prevProps) {
  //   const { kittens } = this.props;
  //   if (prevProps.kittens.length !== kittens.length) {
  //     //   // Ajax call, get new data from the server
  //     console.log("refresh kitten data here");
  //     console.log("kittenList previous props", prevProps);
  //     console.log("kittenList current props", this.props);
  //     //   //   this.retrieveKittens();
  //   }
  // }
  return (
    <div className="sw-50 w-25">
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
};

export default KittenList;
