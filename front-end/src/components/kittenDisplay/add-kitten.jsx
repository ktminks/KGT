import React, { useState } from "react";
import { card, list, listItem } from "../../_utilities/classes";
import { getBirthdate } from "../../_utilities/dates";

const AddKitten = ({ onAddKitten, history }) => {
  const [name, setName] = useState("Kitten name");
  const [sex, setSex] = useState("N/A");
  const [birthdate, setBirthdate] = useState("2021-09-01");
  const [weight, setWeight] = useState(50);
  const [birthdateDivClass, setBirthdateDivClass] = useState("input-group mt-2");
  const [weightDivClass, setWeightDivClass] = useState("d-none");
  const [ageDivClass, setAgeDivClass] = useState("d-none");
  const [ageDisplay, setAgeDisplay] = useState("");
  const [ageCalcClass, setAgeCalcClass] = useState("d-none");
  const [saveButtonClass, setSaveButtonClass] = useState("btn btn-success w-75 ms-2");

  const swapWeightAndBirthdate = (e) => {
    e.preventDefault();
    if (birthdateDivClass.includes("d-none")) {
      setBirthdateDivClass("input-group mt-2");
      setWeightDivClass("d-none");
      setAgeCalcClass("d-none");
      setSaveButtonClass("btn btn-success w-75 ms-2");
    } else {
      setBirthdateDivClass("d-none");
      setWeightDivClass("input-group mt-2");
      setAgeCalcClass("btn btn-warning w-75 ms-2");
      setSaveButtonClass("d-none");
    }
  };

  const estimateAge = (e) => {
    e.preventDefault();
    const age = Math.ceil(weight / 64.5);
    setAgeDisplay(`Weighing ${weight}g, ${name} is likely ${age} days old.`);
    setAgeDivClass(card);
    swapWeightAndBirthdate(e);
    setBirthdate(getBirthdate(age));
  };

  const saveKitten = (e) => {
    e.preventDefault();
    return onAddKitten({ name, sex, birthdate });
  };

  return (
    <section className="me-2" aria-label="add-kitten">
      <h4 className="text-center">Add a new kitten!</h4>

      <form onSubmit={async (e) => { (await saveKitten(e)); }}>
        <div className="input-group">
          <span className="input-group-text">Name</span>
          <input
            type="text"
            className="form-control"
            aria-label="kitten-name"
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
            value={sex}
            placeholder="M, F, or N/A"
            onChange={(e) => setSex(e.target.value)}
            required
            maxLength="3"
            pattern="(M|m|F|f|N\/A|n\/a)?"
          />
        </div>

        <div id="birthdate" className={birthdateDivClass}>
          <span className="input-group-text">Birthdate</span>
          <input
            type="date"
            aria-label="birthdate"
            className="form-control"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />

          <input
            type="button"
            aria-label="Not sure?"
            className="input-group-text"
            value="Not sure?"
            onClick={(e) => swapWeightAndBirthdate(e)}
          />
        </div>

        <div className={weightDivClass}>
          <span className="input-group-text">Weight</span>
          <input
            type="number"
            className="form-control"
            aria-label="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          <span className="input-group-text">Grams</span>
          <input
            type="button"
            aria-label="Swap back"
            className="input-group-text"
            value="Swap back"
            onClick={(e) => swapWeightAndBirthdate(e)}
          />
        </div>

        <div id="calculation" className={ageDivClass}>
          <ul className={list}>
            <li
              aria-label="age-calculation"
              className={listItem}
            >
              {ageDisplay}
            </li>
          </ul>
        </div>

        <div className="d-flex justify-content-evenly mt-2">
          <input
            type="button"
            aria-label="Go back"
            value="Back"
            onClick={() => { history.goBack(); }}
            className="btn btn-secondary w-75"
          />
          <input
            type="button"
            aria-label="estimate-age"
            value="Calculate my age"
            onClick={(e) => estimateAge(e)}
            className={ageCalcClass}
          />
          <input
            type="submit"
            className={saveButtonClass}
            value="Save kitten"
            aria-label="save-kitten"
          />
        </div>
      </form>
    </section>
  );
};

export default AddKitten;
