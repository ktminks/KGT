import React from "react";
import { Link } from "react-router-dom";
import { getDate } from "../_utilities";
import { header } from "../_utilities/classes";

const Header = ({ currentKitten, handleDelete, buttons }) => {
  const {
    name, sex, birthdate, age, id,
  } = currentKitten;

  const onDelete = (e) => {
    e.preventDefault();
    handleDelete(id);
  };

  return (
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
        {(buttons
        && (
        <div className="d-flex flex-row flex-sm-column flex-shrink-1 flex-lg-row">
          <Link
            to={`/kittens/edit/id=${id}`}
            className="btn btn-warning m-1"
          >
            Edit
          </Link>

          <Link
            to="/kittens"
            className="btn btn-danger m-1"
            onClick={onDelete}
          >
            Delete
          </Link>
        </div>
        )
        )}
      </div>
    </div>
  );
};

export default Header;
