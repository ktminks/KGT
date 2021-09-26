import React from "react";
import { Link, useHistory } from "react-router-dom";
import KittenDataService from "../_services/data.service";

const CurrentKitten = ({ currentKitten }) => {
  const history = useHistory();

  const deleteKitten = () => {
    KittenDataService.delete(currentKitten.id)
      .then((response) => {
        console.log(response.data);
        history.push("/kittens");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const { name, sex, birthdate, age, id, milestones, food, concerns, weight } =
    currentKitten;

  const printObject = (obj) => {
    let result = ``;
    console.log(obj);
    for (let m in obj) {
      if (obj[m].length) {
        result += `<div class="d-flex justify-content-between">
                    <h6>${m}:</h6>
                    <div class="w-75 d-flex flex-column flex-nowrap">`;
        for (let n of obj[m]) {
          result += `<div class="d-flex justify-content-between">
                        <div>${n[0]}:</div>
                        <div>${n[1]} days</div>
                      </div>`;
        }
        result += `</div></div>`;
      }
    }
    return result;
  };

  const printArray = (arr) => {
    let result = `<div class="d-flex flex-column flex-nowrap">`;
    for (let n of arr) {
      result += `<div class="d-flex justify-content-between">
                        <div>${n[0]}:</div>
                        <div>${n[1]} days</div>
                      </div>`;
    }
    return (result += `</div>`);
  };

  const getDate = (date) => {
    let newDate = new Date(date);
    let dd = String(newDate.getDate()).padStart(2, "0");
    let mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yy = newDate.getFullYear();
    newDate = mm + "/" + dd + "/" + yy;
    return newDate;
  };

  return (
    <div className="m-auto w-75">
      {id ? (
        <div className="d-flex flex-column">
          <h4 className="text-center">{name}</h4>

          <div className="d-flex justify-content-around">
            <h5>Sex:</h5>
            {sex}
          </div>

          <div className="d-flex justify-content-around">
            <h5>Birth date:</h5>
            {getDate(birthdate)}
          </div>

          <div className="d-flex justify-content-around">
            <h5 className="text-center">Age:</h5>
            {age}
          </div>

          <div className="d-flex justify-content-around">
            <div className="d-flex flex-column w-75 me-2">
              <h5 className="text-center">Milestones:</h5>
              <div
                dangerouslySetInnerHTML={{ __html: printObject(milestones) }}
              ></div>
            </div>

            <div className="d-flex flex-column w-75 ms-2">
              <h5 className="text-center">Food:</h5>
              <div
                dangerouslySetInnerHTML={{ __html: printObject(food) }}
              ></div>

              <div className="d-flex justify-content-around flex-column">
                <h5 className="text-center">Concerns:</h5>
                <div
                  dangerouslySetInnerHTML={{ __html: printArray(concerns) }}
                ></div>
              </div>

              <div className="d-flex justify-content-around flex-column">
                <h5 className="text-center">weight:</h5>
                <div
                  dangerouslySetInnerHTML={{ __html: printArray(weight) }}
                ></div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-around">
            <Link to={"/kittens/" + id} className="btn btn-warning w-75 m-1">
              Edit
            </Link>

            <Link
              to="/"
              className="btn btn-danger m-1 w-75"
              onClick={deleteKitten}
            >
              Delete
            </Link>
          </div>
        </div>
      ) : (
        <p>Please click on a Kitten...</p>
      )}
    </div>
  );
};

export default CurrentKitten;
