import React, { useState } from "react";
import { Link } from "react-router-dom";
import KittenDataService from "../_services/data.service";

const EditKitten = ({
  currentKitten, currentIndex, kittens, onRefresh,
}) => {
  const { name, id, sex } = currentKitten;
  const [newName, changeName] = useState(name);
  const [newSex, changeSex] = useState(sex);

  const updateKitten = async (e) => {
    e.preventDefault();
    currentKitten = { ...currentKitten, sex: newSex, name: newName };
    try {
      const res = await KittenDataService.update(id, currentKitten);
      console.log(res.data);
      kittens.splice(currentIndex, 1, currentKitten);
      onRefresh(currentIndex);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="me-2">
      <h4 className="text-center">
        Edit
        {" "}
        {name}
      </h4>

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

        <div className="d-flex justify-content-evenly mt-2">
          <Link to={`/kittens?id=${id}`} className="btn btn-secondary w-50">
            Back
          </Link>

          <input
            type="submit"
            className="btn btn-success w-50 ms-2"
            value="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default EditKitten;
