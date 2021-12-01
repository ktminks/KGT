import React from "react";
import { get } from "../../_utilities";
import { card, header, list } from "../../_utilities/classes";
import Header from "../header";

const CurrentKitten = ({ currentKitten, handleDelete }) => (
  <section aria-label="current-kitten" data-testid={currentKitten.name}>
    {currentKitten && currentKitten.id ? (
      <section
        className="d-flex flex-column"
      >
        {/* ------- Header : Kitten name & basic details ------- */}
        <Header
          currentKitten={currentKitten}
          handleDelete={handleDelete}
          buttons={1}
        />

        <div className="d-flex flex-wrap flex-row">
          {/* ------- Needs : Current food needs & concerns  ------- */}
          <div className={card}>
            <h5 className={header}>Needs</h5>

            <ul className={list}>{get.formattedNeeds(currentKitten)}</ul>
          </div>

          {/* ------- Status: Current milestones & weight ------- */}
          <div className={card}>
            <h5 className={header}>Status</h5>

            <ul className={list}>{get.formattedStatus(currentKitten)}</ul>
          </div>
        </div>
      </section>
    ) : (
      <p className="text-center">Please click on a Kitten...</p>
    )}
  </section>
);

export default CurrentKitten;
