/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as format from "./formatText";
import { isSoon } from "./dates";

const React = require("react");

let name; let age;
let milestones; let food; let concerns; let weight;
const listItemClass = "list-group-item list-group-item-light flex-grow-1";

// ------------ Utilities --------------
const initKitten = (kitten) => {
  ({
    name, age, milestones, food, concerns, weight,
  } = kitten);
};

const noresult = (title, key = 0) => <li className={listItemClass} key={`${title}${key}-nil`}>No data!</li>;

const getListItem = (text, key) => text && <li key={key} className={listItemClass}>{text}</li>;

const getList = (list, title) => (list ? (
  <li key={title}>
    <ul className="list-group">
      <li key={title} className={listItemClass}>{title}</li>
      {list}
    </ul>
  </li>
) : null
);

// -------------------- Fetch single format -------------------- //
const getFoodDetails = (i) => {
  const {
    foodtype: type, capacity: cap, frequency: freq, weaning,
  } = food;

  if (type && cap && freq) {
    const mostRecent = [type, cap, freq].reduce((a, b) => (b[i].age > a[i].age ? b : a));
    let date = isSoon(mostRecent[i].age, age);
    const foodList = date ? getListItem(format.food(type[i], cap[i], freq[i], date, name), `foodlist${i}`) : null;
    date = isSoon(weaning[i].age, age);
    const weanList = foodList ? getListItem(format.wean(weaning[i], date, name), `weanList${i}`) : null;
    return weanList ? [foodList, weanList] : [foodList] || null;
  }
  return null;
};

const getConcerns = (entry, i) => {
  const date = concerns.length ? isSoon(entry.age, age) : null;
  return date ? getListItem(format.concerns(entry, date, name), `concerns${i}`) : null;
};

const getWeight = (entry, i) => {
  const date = isSoon(entry.age, age);
  return date ? getListItem(format.weight(entry, date, name), `weight${i}`) : null;
};

const getMilestones = (i, title) => {
  const entry = milestones[title][i];
  const date = isSoon(entry.age, age);
  return date ? getListItem(format[title](entry, date, name), `${title}${i}`) : null;
};

// ------------------ Get all data formatted  ------------------- //

const getGrowth = (category, title) => (
  getList(milestones[category].map((e, i) => getMilestones(i, title)), title) || null
);

// ------ Route export functions to format functions ---- //

const printItem = (category, index) => {
  const development = ["ears", "eyes", "teeth", "mobility"];
  const needs = ["temperature", "litterTraining", "socialization", "veterinary"];
  const router = {
    concerns: () => getConcerns(concerns[index]),
    weight: () => getWeight(weight[index]),
    food: () => getFoodDetails(index),
    milestones: () => development.map((title) => getMilestones(index, title)),
    needs: () => needs.map((title) => getMilestones(index, title)),
    "upcoming concerns": () => (concerns.length ? concerns.map((e, i) => getConcerns(e, i)) : null),
    "upcoming weight": () => {
      let prevIndex = 0;
      return weight.length ? weight.flatMap((e, i) => {
        if (i === 0 || i - prevIndex >= 7) {
          prevIndex = i;
          return getWeight(e, i);
        } return [];
      }, []) : null;
    },
    "upcoming food": () => (food.foodtype.length ? food.foodtype.map((e, i) => getFoodDetails(i)) : null),
    "upcoming milestones": () => development.map((e, i) => getGrowth(e, development[i])),
    "upcoming needs": () => needs.map((e, i) => getGrowth(e, needs[i])),
  };
  return router[category]();
};

// -------------- final return before export --------------- //

const getDetail = (category, index) => {
  const result = printItem(category, index) || noresult(category, index);
  return (
    <li key={category} className={listItemClass}>
      <h6 className="card-subtitle text-muted text-center">{category}</h6>
      <ul className="list-group list-group-flush">{result}</ul>
    </li>
  );
};

// ------------------ exports ----------------------- //

export const getDevelopment = (kitten) => {
  initKitten(kitten);
  return [
    getDetail("upcoming milestones"),
    getDetail("upcoming weight"),
  ];
};

export const getFutureNeeds = (kitten) => {
  initKitten(kitten);
  return [
    getDetail("upcoming food"),
    getDetail("upcoming concerns"),
    getDetail("upcoming needs"),
  ];
};

export const getStatus = (kitten) => {
  initKitten(kitten);
  return [
    getDetail("milestones", 0),
    getDetail("weight", 0),
  ];
};

export const getNeeds = (kitten) => {
  initKitten(kitten);
  return [
    getDetail("food", 0),
    getDetail("concerns", 0),
    getDetail("needs", 0),
  ];
};

export const printKittens = (kittens, handleSetActive, currentIndex) => {
  const printKitten = (kitten, index) => {
    const currentClass = `list-group-item list-group-item-action ${index === currentIndex ? "active" : ""}`;

    const keySelect = (e) => handleSetActive(kittens[e.key], e.key);

    return (
      <li
        className={currentClass}
        key={index}
        onKeyPress={(e) => keySelect(e)}
        onClick={() => handleSetActive(kitten, index)}
      >
        {kitten.name}
      </li>
    );
  };

  return (kittens && kittens.map(printKitten));
};
