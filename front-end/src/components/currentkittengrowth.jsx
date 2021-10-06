import React from "react";
import "regenerator-runtime/runtime";
import { getNeeds, getDevelopment, getDate } from "../_utilities";
import { card, header, list } from "../_utilities/classes";

const CurrentKittenGrowth = ({ currentKitten }) => {
  const {
    name, sex, birthdate, age, id,
  } = currentKitten;

  const printObject = (obj) => {
    const result = [];
    const noresult = (
      <li className={listItem} key="nil">
        Nothing in the next two weeks!
      </li>
    );
    for (const m in obj) {
      if (obj[m].length) {
        result.push(
          <li className={listItem} key={obj[m]}>
            <ul className={`${list} w-75`}>
              <li className={listItem} key="title">
                <h6 className="align-self-start">
                  {m}
                  :
                </h6>
              </li>
              {printArray(obj[m])}
            </ul>
          </li>,
        );
      }
    }
    return result.length ? result : noresult;
  };

  const printArray = (arr) => {
    const result = [];
    let prevValue;
    let prevDays = -999;
    const noresult = (
      <li className={listItem} key="nil">
        Nothing in the next two weeks!
      </li>
    );
    if (arr.length) {
      for (const n of arr) {
        if (n[0] !== prevValue) {
          const days = n[1] - age;
          const diff = n[1] - prevDays;
          if (days < 14 && diff >= 3) {
            result.push(
              <li className={listItem} key={days}>
                <div>{n[0]}</div>
                <div>{days === 0 ? "today" : `in ${days} days`}</div>
              </li>,
            );
            prevDays = n[1];
          }
        }
        prevValue = n[0];
      }
    }
    return result.length ? result : noresult;
  };

  return (
    <div>
      {id ? (
        <div className="d-flex flex-column">
          {/* ------- Header : Kitten name & basic details ------- */}
          <div className="card m-2">
            <div className={header}>
              <div className="card-title display-5">{name}</div>
              <h6 className="card-subtitle text-muted ms-3 align-self-center">
                {`${age} days old (about ${Math.round(age / 7)} weeks)`}
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
            {/* ------- Needs : Current food needs & concerns  ------- */}
            <div className={card}>
              <h5 className={header}>Upcoming Needs</h5>

              <ul className={list}>{getNeeds(currentKitten)}</ul>
            </div>

            {/* ------- Status: Current milestones & weight ------- */}
            <div className={card}>
              <h5 className={header}>Development</h5>

              <ul className={list}>{getDevelopment(currentKitten)}</ul>
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
