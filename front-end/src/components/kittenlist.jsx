import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const KittenList = ({ kittens, currentIndex, setActiveKitten }) => {
  const [kittensList, fetchData] = React.useState(kittens);

  const handleRefresh = (kittens) => fetchData(kittens);

  useEffect(() => {
    fetchData(kittens);
    console.log("Fetching more kittens for KittenList...");
    listKittens();
  }),
    [kittensList];

  const listKittens = () => {
    return (
      kittensList &&
      kittensList.map((kitten, index) => (
        <li
          className={
            "list-group-item " + (index === currentIndex ? "active" : "")
          }
          onClick={() => setActiveKitten(kitten, index)}
          key={index}
        >
          {kitten.name}
        </li>
      ))
    );
  };

  return (
    <div className="mb-3">
      <h4>Kittens List</h4>

      <ul className="list-group">
        <Link to={"/add"} className="btn btn-danger">
          +
        </Link>
        {listKittens()}
      </ul>
    </div>
  );
};

export default KittenList;
