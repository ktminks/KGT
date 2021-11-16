import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import KittenDataService from "../../_services/data.service";

const EditKitten = ({
  currentKitten, currentIndex, kittens, onRefresh,
}) => {
  const { name, id, sex } = currentKitten;
  const [newName, changeName] = useState(name);
  const [newSex, changeSex] = useState(sex);
  const history = useHistory();

  const updateKitten = (e) => {
    e.preventDefault();
    const newKitten = { ...currentKitten, sex: newSex, name: newName };
    try {
      KittenDataService.update(id, newKitten)
        .then((res) => {
          const { message, updatedKitten } = res.data;
          console.log(message);
          if (updatedKitten) {
            kittens.splice(currentIndex, 1, newKitten);
            onRefresh(currentIndex);
            // history.push(`/kittens/id=${id}`);
            history.goBack();
          }
        });
    } catch (err) {
      console.error(err);
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
          <input
            type="button"
            className="btn btn-secondary w-50"
            onClick={() => history.goBack()}
            value="Back"
          />

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
