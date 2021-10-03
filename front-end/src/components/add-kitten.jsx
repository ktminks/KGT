import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KittenDataService from "../_services/data.service";
import "regenerator-runtime/runtime";

const AddKitten = ({ kittens, onRefresh }) => {
  const [name, setName] = useState("Kitten name");
  const [sex, setSex] = useState("N/A");
  const [birthdate, setBirthdate] = useState("2021-09-01");

  const getAge = () => {
    const today = new Date();
    const dob = new Date(birthdate);
    return Math.ceil((today - dob) / (1000 * 60 * 60 * 24));
  };

  const saveKitten = async (e) => {
    e.preventDefault();
    const age = getAge();
    const data = { name, sex, birthdate, age };
    try {
      const res = await KittenDataService.create(data);
      const newKitten = res.data;
      kittens.push(newKitten);
      onRefresh("add");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="m-auto w-75">
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
        </div>

        <div className="d-flex justify-content-evenly mt-2">
          <Link to="/" className="btn btn-secondary w-75 m-1">
            Back
          </Link>
          <input type="submit" className="btn btn-success w-75 m-1" />
        </div>
      </form>
    </div>
  );
};

export default AddKitten;
