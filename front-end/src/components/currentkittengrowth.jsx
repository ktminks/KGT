import React from "react";
import "regenerator-runtime/runtime";
import { getCurrentItems, getLastItem, getDate } from "../_utilities/get";

const CurrentKittenGrowth = ({ currentKitten }) => {
  const { name, sex, birthdate, age, id, milestones, food, concerns, weight } =
    currentKitten;

  // const getMilestones = () => {
  //   let result = [];
  //   for (let m in milestones) {
  //     if (milestones[m].length) {
  //       result.push(
  //         <li key={m} className={listItemClass}>
  //           <h6>{m}:</h6>
  //           {printArray(milestones[m])}
  //         </li>
  //       );
  //     }
  //   }
  //   return result;
  // };

  const printObject = (obj) => {
    let result = [];
    const noresult = (
      <li className={listItemClass} key="nil">
        Nothing in the next two weeks!
      </li>
    );
    for (let m in obj)
      if (obj[m].length) {
        result.push(
          <li className={listItemClass} key={obj[m]}>
            <ul className={`${listClass} w-75`}>
              <li className={listItemClass} key="title">
                <h6 className="align-self-start">{m}:</h6>
              </li>
              {printArray(obj[m])}
            </ul>
          </li>
        );
      }
    return result.length ? result : noresult;
  };

  const printArray = (arr) => {
    let result = [],
      prevValue,
      prevDays = -999;
    const noresult = (
      <li className={listItemClass} key="nil">
        Nothing in the next two weeks!
      </li>
    );
    if (arr.length) {
      for (let n of arr) {
        if (n[0] !== prevValue) {
          const days = n[1] - age;
          let diff = n[1] - prevDays;
          if (days < 14 && diff >= 3) {
            result.push(
              <li className={listItemClass} key={days}>
                <div>{n[0]}</div>
                <div>{days === 0 ? "today" : `in ${days} days`}</div>
              </li>
            );
            prevDays = n[1];
          }
        }
        prevValue = n[0];
      }
    }
    return result.length ? result : noresult;
  };

  const cardClass = "d-flex flex-column card m-2 align-self-start flex-grow-1";
  const headerClass = "card-header d-flex flex-row flex-grow-1";
  const listClass =
    "list-group list-group-flush d-flex flex-grow-1 justify-content-end";
  const listItemClass =
    "list-group-item list-group-item-light flex-grow-1 d-flex justify-content-between flex-wrap align-items-center";

  return (
    <div>
      {id ? (
        <div className="d-flex flex-column">
          {/* ------- Header : Kitten name & basic details ------- */}
          <div className="card m-2">
            <div className={headerClass}>
              <div className="card-title display-5">{name}</div>
              <h6 className="card-subtitle text-muted ms-3 align-self-center">
                {age} days old (about {Math.round(age / 7)} weeks)
              </h6>
            </div>

            <div className="card-body d-flex justify-content-sm-between align-items-center">
              <div className="card-text m-auto w-50">
                <div className="d-flex justify-content-between flex-row align-items-center">
                  <h6 className="card-subtitle">Sex:</h6>
                  {sex}
                </div>

                <div className="d-flex justify-content-between flex-row align-items-center ">
                  <h6 className="card-subtitle">DOB: </h6>
                  {getDate(birthdate)}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap flex-row">
            <div className={cardClass}>
              <h5 className={headerClass}>Milestones</h5>
              <ul className={listClass}>{printObject(milestones)}</ul>
              {/* <ul className="list-group list-group-flush">{getMilestones()}</ul> */}
            </div>

            <div className={cardClass}>
              <h5 className={headerClass}>Food</h5>
              <ul className={listClass}>{printObject(food)}</ul>
            </div>

            <div className={cardClass}>
              <h5 className={headerClass}>Concerns</h5>
              <ul className={listClass}>{printArray(concerns)}</ul>
            </div>

            <div className={cardClass}>
              <h5 className={headerClass}>Weight</h5>
              <ul className={listClass}>{printArray(weight)}</ul>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Please click on a Kitten...</p>
      )}
    </div>
  );
};

export default CurrentKittenGrowth;
