import React from "react";
import { useHistory } from "react-router-dom";
import * as Alert from "../alerts/alerts";
import KittenDataService from "../../_services/data.service";
import { get } from "../../_utilities";
import { card, header, list } from "../../_utilities/classes";

const { Header } = require("..");

const CurrentKitten = ({
  currentKitten, currentIndex, kittens, onRefresh,
}) => {
  const { id } = currentKitten;
  // ------- Handle updating data --------------
  const history = useHistory();
  const deleteKitten = () => {
    try {
      KittenDataService.delete(id)
        .then((res) => {
          Alert.Success(res.data.message);
          kittens.splice(currentIndex, 1);
          onRefresh();
          history.push("/kittens");
        });
    } catch (e) { Alert.Problem(e); }
    // } catch (e) {
    //   console.error(e);
    // }
  };

  // --------- Finally, render -------------
  const buttons = true;
  return (
    <div>
      {id ? (
        <div className="d-flex flex-column">
          {/* ------- Header : Kitten name & basic details ------- */}
          <Header
            currentKitten={currentKitten}
            deleteKitten={deleteKitten}
            buttons={buttons}
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
        </div>
      ) : (
        <p className="text-center">Please click on a Kitten...</p>
      )}
    </div>
  );
};

export default CurrentKitten;
