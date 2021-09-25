import React from "react";
import { Link, useHistory } from "react-router-dom";
import KittenDataService from "../_services/data.service";

const AddKitten = () => {
  const history = useHistory();
  const [name, setName] = React.useState("Kitten name");
  const [sex, setSex] = React.useState("NA");
  const [birthdate, setBirthdate] = React.useState("2021-09-01");

  useEffect(() => {
    console.log("Add Kitten refreshed the DOM");
  });

  const getAge = () => {
    const today = new Date();
    const dob = new Date(birthdate);
    return Math.ceil((today - dob) / (1000 * 60 * 60 * 24));
  };

  const saveKitten = (e) => {
    e.preventDefault();
    const age = getAge();
    const data = { name, sex, birthdate, age };
    KittenDataService.create(data)
      .then((res) => {
        console.log(res.data);
        history.push("/");
      })
      .catch((e) => console.log(e));
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group mt-2">
          <span className="input-group-text">Sex</span>
          <input
            type="text"
            className="form-control"
            maxLength="2"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          />
        </div>

        <div className="input-group mt-2">
          <span className="input-group-text">Birthdate</span>
          <input
            type="date"
            className="form-control"
            required
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
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
