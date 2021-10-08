import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { card, list, listItem } from "../_utilities/classes";

const AgeEstimator = () => {
  const location = useLocation().state;
  const [name, setName] = useState(location.name || "");
  const [sex, setSex] = useState(location.sex || "");
  const [birthdate, setBirthdate] = useState();
  const [weight, setWeight] = useState(50);
  const [ageDivClass, setAgeDivClass] = useState(`${card} d-none`);
  const [ageDisplay, setAgeDisplay] = useState("");

  const getBirthdate = (age) => {
    const today = new Date();
    let date = new Date();
    date.setDate(today.getDate() - age);
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yy = date.getFullYear();
    date = mm + "/" + dd + "/" + yy;
    return date;
  }

  // estimateAge = (kitten, min = 0, max = 999, weightCheck = false) => {
  //   if (max - min <= 7) {
  //     kitten.age = Math.floor((max + min) / 2);
  //     console.log(
  //       `${kitten.name} is approximately ${Math.floor(kitten.age / 7)} weeks old!`
  //     );
  //     return;
  //   } else if (kitten.milestone.weight.length > 0 && weightCheck == false) {
  //     let weight = kitten.milestone.weight[0][1]; // in grams
  //     if (weight > 2600) {
  //       // cat is probably at least 6 months
  //     } else {
  //       if (weight < 850)
  //         estimateAge(kitten, (weight - 150) / 14, (weight - 100) / 14, true);
  //     }
  //   } else {
  //     // adjust minimum
  //     if (kitten.milestone["litter-trained"]) {
  //       // at least a few weeks
  //     } else {
  //       // must be very young
  //     }
  //   }
  // };


  const estimateAge = (e) => {
    e.preventDefault();
    const age = Math.ceil(weight / 64.5);
    setAgeDisplay(`Weighing ${weight}g, ${name} is likely ${age} days old.`);
    setBirthdate(getBirthdate(age));
    setAgeDivClass(card);
  };

  return (
    <div className="me-2">
      <h4 className="text-center">Add a new kitten!</h4>

      <form onSubmit={estimateAge}>
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
          <span className="input-group-text">Weight</span>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          <span className="input-group-text">Grams</span>
        </div>

        <div className="d-flex justify-content-evenly mt-2">
          <Link to="/kittens/add" className="btn btn-secondary w-75">
            Back
          </Link>
          <button onClick={estimateAge} className="btn btn-warning w-75 ms-2">
            Calculate my age
          </button>
        </div>

        <div id="calculation" className={ageDivClass}>
          <ul className={list}>
            <li className={listItem}>
              {ageDisplay}
            </li>
            <li className={listItem}>
              <Link
                to={{
                  pathname: "/kittens/add",
                  state: { name: name, sex: sex, birthdate: birthdate, saveKitten: location.saveKitten }
                }}
                onclick={location.saveKitten}
                className="btn btn-success w-75 ms-2"
              >Add this kitten</Link>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default AgeEstimator;
