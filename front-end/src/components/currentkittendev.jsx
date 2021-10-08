import React from "react";
import { getFutureNeeds, getDevelopment } from "../_utilities";
import { card, header, list } from "../_utilities/classes";

const { Header } = require(".");

const CurrentKittenDev = ({ currentKitten }) => {
  const buttons = false;
  return (
    <div>
      {currentKitten.id ? (
        <div className="d-flex flex-column">
          {/* ------- Header : Kitten name & basic details ------- */}
          <Header
            currentKitten={currentKitten}
            buttons={buttons}
          />

          <div className="d-flex flex-wrap flex-row">
            {/* ------- Needs : Current food needs & concerns  ------- */}
            <div className={card}>
              <h5 className={header}>Upcoming Needs</h5>

              <ul className={list}>{getFutureNeeds(currentKitten)}</ul>
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

export default CurrentKittenDev;
