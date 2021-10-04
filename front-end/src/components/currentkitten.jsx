import React from "react";
import { Link } from "react-router-dom";
import KittenDataService from "../_services/data.service";
import "regenerator-runtime/runtime";
import { getDate, getNeeds, getStatus } from "../_utilities";

const CurrentKitten = ({ currentKitten, currentIndex, kittens, onRefresh }) => {
  const { name, sex, birthdate, age, id, milestones, food, concerns, weight } =
    currentKitten;

  // ------- Handle updating data --------------

  const deleteKitten = async () => {
    try {
      const res = await KittenDataService.delete(id);
      console.log(res.data);
      kittens.splice(currentIndex, 1);
      currentKitten = null;
      onRefresh("delete");
    } catch (e) {
      console.log(e);
    }
  };

  const getNeedsBound = getNeeds.bind(currentKitten);

  // --------- Finally, render -------------

  return (
    <div>
      {id ? (
        <div className="d-flex flex-column w-100">
          {/* ------- Header : Kitten name & basic details ------- */}
          <div className="card m-2 mt-4">
            <div className="card-header d-flex flex-row">
              <h4 className="card-title">{name}</h4>
              <h6 className="card-subtitle text-muted ms-3 align-self-center">
                {age} days old (about {Math.round(age / 7)} weeks)
              </h6>
            </div>

            <div className="card-body d-flex justify-content-sm-between align-items-center">
              <div className="card-text m-auto w-50">
                <div className="d-flex justify-content-between flex-row align-items-center">
                  <h6 className="card-subtitle">Sex:</h6>
                  {sex}
                </div>

                <div className="d-flex justify-content-between flex-row align-items-center ">
                  <h6 className="card-subtitle">DOB: </h6>
                  {getDate(birthdate)}
                </div>
              </div>

              <div className="d-flex flex-row flex-sm-column flex-shrink-1 flex-lg-row">
                <Link
                  to={`/kittens/edit/${id}`}
                  className="btn btn-warning m-1"
                >
                  Edit
                </Link>

                <Link
                  to="/kittens"
                  className="btn btn-danger m-1"
                  onClick={deleteKitten}
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap flex-column flex-sm-row">
            {/* ------- Needs : Current food needs & concerns  ------- */}
            <div className="d-flex flex-column card m-2 flex-grow-1 align-self-start">
              <h5 className="card-header">Needs</h5>

              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {getNeedsBound(currentKitten)}
                </ul>
              </div>
            </div>

            {/* ------- Status: Current milestones & weight ------- */}
            <div className="d-flex flex-column card m-2 flex-grow-1 align-self-start">
              <h5 className="card-header">Status</h5>

              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {getStatus(currentKitten)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Please click on a Kitten...</p>
      )}
    </div>
  );
};

export default CurrentKitten;
