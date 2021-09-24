import React from "react";
import { Link, useHistory } from "react-router-dom";
import KittenDataService from "../_services/data.service";

const CurrentKitten = ({ currentKitten }) => {
  const history = useHistory();
  const deleteKitten = () => {
    KittenDataService.delete(currentKitten.id)
      .then((response) => {
        console.log(response.data);
        history.push("/kittens");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const { name, sex, birthdate, age, id } = currentKitten;

  return (
    <div className="m-auto w-75">
      {id ? (
        <div className="d-flex flex-column">
          <h4 className="text-center">{name}</h4>
          <div className="d-flex justify-content-around">
            <h5>Sex:</h5>
            {sex}
          </div>
          <div className="d-flex justify-content-around">
            <h5>Birth date:</h5>
            {birthdate}
          </div>
          <div className="d-flex justify-content-around">
            <h5>Age:</h5>
            {age}
          </div>
          <div className="d-flex justify-content-around">
            <Link
              // to="/"
              // component={<EditKitten />}
              to={"/kittens/" + id}
              className="btn btn-warning w-75 m-1"
            >
              Edit
            </Link>

            <Link
              to="/"
              className="btn btn-danger m-1 w-75"
              onClick={deleteKitten}
            >
              Delete
            </Link>
          </div>
        </div>
      ) : (
        <p>Please click on a Kitten...</p>
      )}
    </div>
  );
};

export default CurrentKitten;
