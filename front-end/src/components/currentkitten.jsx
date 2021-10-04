import React from "react";
import { Link } from "react-router-dom";
import KittenDataService from "../_services/data.service";
import "regenerator-runtime/runtime";
import { getCurrentItems, getLastItem, getDate } from "../utilities/get";

const CurrentKitten = ({ currentKitten, currentIndex, kittens, onRefresh }) => {
  const { name, sex, birthdate, age, id, milestones, food, concerns, weight } =
    currentKitten;

  // ------- Handle updating data --------------

  const deleteKitten = async () => {
    try {
      const res = await KittenDataService.delete(id);
      console.log(res.data);
      kittens.splice(currentIndex, 1);
      currentKitten = null;
      onRefresh("delete");
    } catch (e) {
      console.log(e);
    }
  };

  // ---------- Utilities ------------

  // ------- Handle formatting data --------------

  const getDetail = (category) => {
    return (
      <li key={category} className="list-group-item">
        <h6 className="card-subtitle text-muted text-center">{category}</h6>
        <ul className="list-group list-group-flush">{printItem(category)}</ul>
      </li>
    );
  };

  const printItem = (item) => {
    let result = [];
    const noresult = <li className="list-group-item">No data!</li>;
    if (item === "concerns") result = getConcerns();
    else if (item === "weight") result = getWeight();
    else if (item === "milestones") result = getMilestones();
    else if (item === "food") result = getFoodDetails();
    else if (item === "development") result = getDevelopmentalNeeds();
    return result.length ? result : noresult;
  };

  // --------- Needs -----------
  const getNeeds = () => {
    const result = [];

    result.push(getDetail("food"));
    result.push(getDetail("concerns"));
    result.push(getDetail("development"));

    return result;
  };

  const getFoodDetails = () => {
    const { foodtype, capacity, frequency, weaning } = getCurrentItems(food);
    let result = [];

    if (foodtype && capacity && frequency) {
      let details = `${name} should be eating at least ${capacity[0]}ml of ${foodtype[0]}, at least every ${frequency[0]} hours.`;
      result.push(
        <li key={"food"} className="list-group-item">
          {details}
        </li>
      );
    }

    if (weaning) {
      let weanDetails = `${name} is weaning! Gradually introduce wet and/or dry kitten food.`;
      result.push(
        <li key={"weaning"} className="list-group-item">
          {weanDetails}
        </li>
      );
    }

    return result;
  };

  const getConcerns = () => {
    if (concerns.length) {
      const c = concerns.reduce(getLastItem)[0];
      return [
        <li key={concerns} className="list-group-item">
          {`${name}'s biggest current concern is ${c}`}
        </li>,
      ];
    } else return [];
  };

  const getNeedsDetails = () => {
    let devDetails = [];
    const {
      temperature: temp,
      litterbox: litter,
      socialization: social,
      vet,
    } = getCurrentItems(milestones);

    if (temp)
      devDetails.push(
        `${name}'s environment should be kept between ${temp[0]} and ${temp[2]} F`
      );
    if (litter) devDetails.push(`${name} needs ${litter[0]}`);
    if (social) devDetails.push(`${name} should be ${social[0]}`);
    if (vet) {
      let days = vet[1] - age;
      devDetails.push(
        `${name}'s next vet visit is coming up! ${vet[0]} needed in ${days} days`
      );
    }
    return devDetails;
  };

  const getDevelopmentalNeeds = () => {
    let devDetails = getNeedsDetails();
    let result = [];

    for (let n of devDetails) {
      result.push(
        <li key={n} className="list-group-item">
          {n}
        </li>
      );
    }

    return result;
  };

  // ------------ Status -------------
  const getStatus = () => {
    const result = [];

    result.push(getDetail("milestones"));
    result.push(getDetail("weight"));

    return result;
  };

  const getWeight = () => {
    if (weight.length) {
      const g = weight[0][0];
      const lb = Number.parseFloat(g / 454).toPrecision(2);
      return [
        <li key={weight} className="list-group-item">
          {`${name} should weigh around ${g}g (about ${lb}lb)`}
        </li>,
      ];
    } else return [];
  };

  const getMilestoneDetails = () => {
    const { eyes, ears, teeth, mobility } = getCurrentItems(milestones);

    let devDetails = [];
    if (eyes) devDetails.push(`${name}'s eyes should be ${eyes[0]}`);
    if (ears) devDetails.push(`${name}'s ears should be ${ears[0]}`);
    if (teeth) devDetails.push(`${name} should start showing ${teeth[0]} soon`);
    if (mobility) devDetails.push(`${name} should be ${mobility[0]} around`);
    return devDetails;
  };

  const getMilestones = () => {
    let devDetails = getMilestoneDetails();
    let result = [];

    for (let n of devDetails) {
      result.push(
        <li key={n} className="list-group-item">
          {n}
        </li>
      );
    }

    return result;
  };

  // --------- Finally, render -------------

  return (
    <div>
      {id ? (
        <div className="d-flex flex-column w-100">
          {/* ------- Header : Kitten name & basic details ------- */}
          <div className="card m-2 mt-4">
            <div className="card-header d-flex flex-row">
              <h4 className="card-title">{name}</h4>
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

              <div className="d-flex flex-row flex-sm-column flex-shrink-1 flex-lg-row">
                <Link
                  to={`/kittens/edit/${id}`}
                  className="btn btn-warning m-1"
                >
                  Edit
                </Link>

                <Link
                  to="/kittens"
                  className="btn btn-danger m-1"
                  onClick={deleteKitten}
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap flex-column flex-sm-row">
            {/* ------- Needs : Current food needs & concerns  ------- */}
            <div className="d-flex flex-column card m-2 flex-grow-1 align-self-start">
              <h5 className="card-header">Needs</h5>

              <div className="card-body">
                <ul className="list-group list-group-flush">{getNeeds()}</ul>
              </div>
            </div>

            {/* ------- Status: Current milestones & weight ------- */}
            <div className="d-flex flex-column card m-2 flex-grow-1 align-self-start">
              <h5 className="card-header">Status</h5>

              <div className="card-body">
                <ul className="list-group list-group-flush">{getStatus()}</ul>
              </div>
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
