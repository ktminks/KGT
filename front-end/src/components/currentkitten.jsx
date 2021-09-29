import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import KittenDataService from "../_services/data.service";

const CurrentKitten = ({ currentKitten }) => {
  const history = useHistory();
  const { name, sex, birthdate, age, id, milestones, food, concerns, weight } =
    currentKitten;

  useEffect(() => {
    console.log("Current Kitten refreshed the DOM");
  });

  const deleteKitten = () => {
    KittenDataService.delete(currentKitten.id)
      .then((response) => {
        console.log(response.data);
        history.push({ pathname: "/" });
      })
      .catch((e) => console.log(e));
  };

  const printObject = (obj) => {
    let result = ``;
    console.log(obj);
    for (let m in obj)
      if (obj[m].length) {
        result += `<div class="d-flex justify-content-between flex-wrap">
                    <h6>${m}:</h6>
                    <div class="w-100">
                    ${printArray(obj[m])}</div></div>`;
      }
    return result === "" ? "Nothing in the next two weeks!" : result;
  };

  const printArray = (arr) => {
    let result = ``,
      prevValue;
    if (arr.length) {
      for (let n of arr) {
        if (n[0] !== prevValue) {
          const days = n[1] - age;
          if (days < 14) {
            result += `<div class="d-flex justify-content-between">
                            <div>${n[0]}</div>
                            <div>${
                              days === 0 ? "today" : `in ${days} days`
                            }</div>
                          </div>`;
          }
        }
        prevValue = n[0];
      }
    }
    return result === "" ? "Nothing in the next two weeks!" : result;
  };

  const getDate = (date) => {
    let newDate = new Date(date);
    const dd = String(newDate.getDate()).padStart(2, "0");
    const mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yy = newDate.getFullYear();
    newDate = mm + "/" + dd + "/" + yy;
    return newDate;
  };

  return (
    <div>
      {id ? (
        <div className="d-flex flex-column w-100">
          <div className="card m-2 mt-5">
            <div className="card-header d-flex flex-column flex-md-row">
              <h4 className="card-title">{name}</h4>
              <h6 className="card-subtitle text-muted ms-3 align-self-center">
                {age} days old (about {Math.round(age / 7)} weeks)
              </h6>
            </div>
            <div className="card-body w-100">
              <div className="card-text px-5">
                <div className="d-flex justify-content-between">
                  <h6 className="card-subtitle">Sex:</h6>
                  {sex}
                </div>

                <div className="d-flex justify-content-between">
                  <h6 className="card-subtitle">Birth date:</h6>
                  {getDate(birthdate)}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap flex-sm-row">
            <div className="d-flex flex-column card m-2 flex-grow-1">
              <h5 className="card-header">Milestones</h5>
              <div
                className="p-4"
                dangerouslySetInnerHTML={{ __html: printObject(milestones) }}
              ></div>
            </div>

            <div className="d-flex flex-column card m-2 flex-grow-1">
              <h5 className="text-center card-header">Food:</h5>
              <div
                className="p-4"
                dangerouslySetInnerHTML={{ __html: printObject(food) }}
              ></div>
            </div>

            <div className="d-flex justify-content-between flex-column card m-2 flex-grow-1">
              <h5 className="text-center card-header">Concerns:</h5>
              <div
                className="p-4"
                dangerouslySetInnerHTML={{ __html: printArray(concerns) }}
              ></div>
            </div>

            <div className="d-flex justify-content-between flex-column card m-2 flex-grow-1">
              <h5 className="text-center card-header">Weight:</h5>
              <div
                className="p-4"
                dangerouslySetInnerHTML={{ __html: printArray(weight) }}
              ></div>
            </div>
          </div>

          <div className="d-flex justify-content-around w-50 m-auto">
            <Link
              to={"/kittens/" + id}
              className="btn btn-warning m-1 flex-grow-1"
            >
              Edit
            </Link>

            <Link
              to="/"
              className="btn btn-danger m-1 flex-grow-2"
              onClick={deleteKitten}
            >
              Delete
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center">Please click on a Kitten...</p>
      )}
    </div>
  );
};

export default CurrentKitten;
