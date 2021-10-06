import React from "react";
import { Link } from "react-router-dom";
import KittenDataService from "../_services/data.service";
import "regenerator-runtime/runtime";
import { getDate, getNeeds, getStatus } from "../_utilities";
import { card, header, list } from "../_utilities/classes";

const CurrentKitten = ({
  currentKitten, currentIndex, kittens, onRefresh,
}) => {
  const {
    name, sex, birthdate, age, id,
  } = currentKitten;

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

  // --------- Finally, render -------------

  return (
    <div>
      {id ? (
        <div className="d-flex flex-column">
          {/* ------- Header : Kitten name & basic details ------- */}
          <div className="card m-2">
            <div className={header}>
              <div className="card-title display-5">{name}</div>
              <h6 className="card-subtitle text-muted ms-3 align-self-center">
                {`${age} days old (about ${Math.round(age / 7)} weeks)`}
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

          <div className="d-flex flex-wrap flex-row">
            {/* ------- Needs : Current food needs & concerns  ------- */}
            <div className={card}>
              <h5 className={header}>Needs</h5>

              <ul className={list}>{getNeeds(currentKitten)}</ul>
            </div>

            {/* ------- Status: Current milestones & weight ------- */}
            <div className={card}>
              <h5 className={header}>Status</h5>

              <ul className={list}>{getStatus(currentKitten)}</ul>
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
