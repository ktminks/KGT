import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import KittenDataService from "../_services/data.service";

const AddKitten = ({ kittens, onRefresh }) => {
  const location = useLocation().state;
  console.log(location);
  const defaultName = location ? location.name : "Kitten name";
  const defaultSex = location ? location.sex : "N/A";
  const defaultBirthdate = location ? location.birthdate : "2021-09-01";

  const [name, setName] = useState(defaultName);
  const [sex, setSex] = useState(defaultSex);
  const [birthdate, setBirthdate] = useState(defaultBirthdate);

  const saveKitten = (e) => {
    e.preventDefault();
    try {
      KittenDataService.create({
        name, sex, birthdate,
      }).then((res) => {
        const newKitten = res.data;
        kittens.push(newKitten);
        onRefresh();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="me-2">
      <h4 className="text-center">Add a new kitten!</h4>

      <form onSubmit={saveKitten}>
        <div className="input-group">
          <span className="input-group-text">Name</span>
          <input
            type="text"
            className="form-control"
            value={name}
            placeholder="Up to 20 letters and spaces only"
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="20"
            pattern="[a-zA-Z]+\s?[A-Za-z]+"
          />
        </div>

        <div className="input-group mt-2">
          <span className="input-group-text">Sex</span>
          <input
            type="text"
            className="form-control"
            maxLength="2"
            value={sex}
            placeholder="M, F, or N/A"
            onChange={(e) => setSex(e.target.value)}
            required
            maxLength="3"
            pattern="(M|m|F|f|N\/A|n\/a)?"
          />
        </div>

        <div className="input-group mt-2">
          <span className="input-group-text">Birthdate</span>
          <input
            type="date"
            className="form-control"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
          <Link
            // to="/kittens/age" 
            to={{
              pathname: "/kittens/age",
              state: { name: name, sex: sex, birthdate: birthdate, saveKitten: saveKitten }
            }}
            className="input-group-text"
          >Not sure?</Link>
        </div>

        <div className="d-flex justify-content-evenly mt-2">
          <Link to="/kittens" className="btn btn-secondary w-75">Back</Link>
          <input type="submit" className="btn btn-success w-75 ms-2" />
        </div>
      </form>
    </div>
  );
};

export default AddKitten;
