import React from "react";
import { get } from "../../_utilities";
import { card, header, list } from "../../_utilities/classes";
import Header from "../header";

const CurrentKittenDev = ({ currentKitten }) => (
  <section aria-label="current-kitten-growth" data-testid={currentKitten.name}>
    {currentKitten && currentKitten.id ? (
      <div className="d-flex flex-column">
        {/* ------- Header : Kitten name & basic details ------- */}
        <Header
          currentKitten={currentKitten}
          buttons={0}
        />

        <div className="d-flex flex-wrap flex-row">
          {/* ------- Needs : Current food needs & concerns  ------- */}
          <div className={card}>
            <h5 className={header}>Upcoming Needs</h5>

            <ul className={list}>{get.formattedFutureNeeds(currentKitten)}</ul>
          </div>

          {/* ------- Status: Current milestones & weight ------- */}
          <div className={card}>
            <h5 className={header}>Development</h5>

            <ul className={list}>{get.formattedDevelopment(currentKitten)}</ul>
          </div>
        </div>
      </div>
    ) : (
      <p className="text-center">Please click on a Kitten...</p>
    )}
  </section>
);

export default CurrentKittenDev;
