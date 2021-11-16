import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import KittenDataService from "../../_services/data.service";
import { card, list, listItem } from "../../_utilities/classes";

const AddKitten = ({ kittens, onRefresh }) => {
  const history = useHistory();
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
  const alert = useAlert();

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

  const getBirthdate = (age) => {
    const today = new Date();
    const date = new Date();
    date.setDate(today.getDate() - age);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const estimateAge = (e) => {
    e.preventDefault();
    const age = Math.ceil(weight / 64.5);
    setAgeDisplay(`Weighing ${weight}g, ${name} is likely ${age} days old.`);
    setAgeDivClass(card);
    swapWeightAndBirthdate(e);
    setBirthdate(getBirthdate(age));
  };

  const saveKitten = async (e) => {
    e.preventDefault();
    try {
      const res = await KittenDataService.create({ name, sex, birthdate });
      const { message, newKitten } = res.data;
      if (newKitten) {
        alert.success(message, { timeout: 2000 });
        kittens.push(newKitten);
        onRefresh();
        history.goBack();
      } else alert.error(message, { timeout: 2000 });
    } catch (err) { alert.error(err, { timeout: 5000 }); }

    // KittenDataService.create({
    //   name, sex, birthdate,
    // }).then((res) => {
    //   const { message, newKitten } = res.data;
    //   console.log(message);
    //   if (newKitten) {
    //     kittens.push(newKitten);
    //     onRefresh();
    //     history.goBack();
    //   }
    // });
    // } catch (err) {
    //   console.error(err);
    // }
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
            <li className={listItem}>
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
            aria-label="Calculate age"
            value="Calculate my age"
            onClick={(e) => estimateAge(e)}
            className={ageCalcClass}
          />
          <input type="submit" className={saveButtonClass} value="Save kitten" />
        </div>
      </form>
    </div>
  );
};

export default AddKitten;
