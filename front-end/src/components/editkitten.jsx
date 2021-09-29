import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import KittenDataService from "../_services/data.service";

const EditKitten = ({ currentKitten }) => {
  const history = useHistory();
  const [newName, changeName] = React.useState(currentKitten.name);
  const [newSex, changeSex] = React.useState(currentKitten.sex);

  useEffect(() => {
    console.log("Edit Kitten refreshed the DOM");
  });

  const updateKitten = (e) => {
    e.preventDefault();
    currentKitten = { ...currentKitten, sex: newSex, name: newName };
    console.log(currentKitten);
    KittenDataService.update(currentKitten.id, currentKitten)
      .then((response) => {
        console.log(response.data);
        history.push("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="m-auto w-75">
      <h4 className="text-center">Edit {currentKitten.name}</h4>
      <form onSubmit={updateKitten}>
        <div className="input-group">
          <span className="input-group-text">Name</span>
          <input
            type="text"
            className="form-control"
            value={newName}
            placeholder="Up to 20 letters and spaces only"
            onChange={(e) => changeName(e.target.value)}
            required
            maxLength="20"
            pattern="[a-zA-Z]+\s?[A-Za-z]+"
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Sex</span>
          <input
            type="text"
            className="form-control"
            value={newSex}
            placeholder="M, F, or N/A"
            onChange={(e) => changeSex(e.target.value)}
            required
            maxLength="3"
            pattern="(M|m|F|f|N\/A|n\/a)?"
          />
        </div>
        <div className="d-flex justify-content-evenly">
          <Link to="/" className="btn btn-secondary w-50 m-1">
            Back
          </Link>

          <input
            type="submit"
            className="btn btn-success w-50 m-1"
            value="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default EditKitten;
