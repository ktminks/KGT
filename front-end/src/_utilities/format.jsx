import * as format from "./formatText";
import { isSoon } from "./dates";

const React = require("react");

let name; let age;
let milestones; let food; let concerns; let weight;
const listItemClass = "list-group-item list-group-item-light";
const listHeaderClass = `h6 text-muted text-center ${listItemClass}`;

// ------------ Utilities --------------
const initKitten = (kitten) => {
  ({
    name, age, milestones, food, concerns, weight,
  } = kitten);
};

const noresult = (title, key = 0) => <li className={listItemClass} key={`${title}${key}-nil`}>No data!</li>;

// const getListItems = (category, title) => category.flatMap((e, i) => getListItem(e, title, i));
const getListItem = (text, key, idx = 0) => text && <li key={`${key}${idx}`} className={listItemClass}>{text}</li>;

const getList = (list, title) => {
  let listItems = list.flat();
  if (!listItems || !listItems.length) listItems = [noresult(title)];
  const header = [<li key={`${title}List`} className={listHeaderClass}>{title}</li>];
  return [...header, ...listItems];
};

// -------------------- Fetch single format -------------------- //
const getRecentDetails = (category) => category.filter((a, b) => {
  const bAgeDiff = b.age - age;
  const aAgeDiff = a.age - age;
  if (aAgeDiff < 7 && aAgeDiff >= -28) return a;
  if (bAgeDiff < 7 && bAgeDiff >= -28) return b;
  return [];
});

const getFutureFoodDetails = () => {
  const {
    foodtype: type, capacity: cap, frequency: freq, weaning,
  } = food;

  if (type && cap && freq) {
    // get details within date range
    const categories = [type, cap, freq, weaning];
    const titles = ["foodtype", "capacity", "frequency", "weaning"];
    const mostRecent = {};
    const foodList = [];
    const weanList = [];

    categories.forEach((category, idx) => {
      const catDetails = getRecentDetails(category);
      mostRecent[titles[idx]] = catDetails;
      catDetails.forEach((detail, i) => {
        const date = isSoon(detail.age, age);
        if (date) {
          if (category === weaning && weaning[i]) {
            weanList.push(getListItem(format.wean(weaning[i], date, name), "weanList", i));
          } else if (category === type && type[i] && cap[i] && freq[i]) {
            foodList.push(getListItem(format.food(type[i], cap[i], freq[i], date, name), "foodlist", i));
          }
        }
      });
    });
    if (!foodList) return [];
    return weanList ? [...foodList, ...weanList] : foodList || [];
  }
  return [];
};

const getFoodDetails = (i) => {
  const {
    foodtype: type, capacity: cap, frequency: freq, weaning,
  } = food;

  if (type && cap && freq) {
    const mostRecent = [type, cap, freq].reduce((a, b) => (b[i].age > a[i].age ? b : a));
    let date = isSoon(mostRecent[i].age, age);
    const foodList = date
      ? getListItem(format.food(type[i], cap[i], freq[i], date, name), "foodlist", i) : null;
    if (!foodList) return [];
    date = isSoon(weaning[i].age, age);
    const weanList = foodList
      ? getListItem(format.wean(weaning[i], date, name), "weanList", i) : [];
    return weanList ? [foodList, weanList] : [foodList] || [];
  }
  return [];
};

const getConcerns = (entry, i) => {
  const date = concerns.length ? isSoon(entry.age, age) : [];
  return date ? getListItem(format.concerns(entry, date, name), "concerns", i) : [];
};

const getWeight = (entry, i) => {
  const date = isSoon(entry.age, age);
  return date ? getListItem(format.weight(entry, date, name), "weight", i) : [];
};

const getMilestones = (i, title) => {
  const entry = milestones[title][i];
  const date = isSoon(entry.age, age);
  return date ? getListItem(format[title](entry, date, name), title, `0${i}`) : [];
};

// ------------------ Get all data formatted  ------------------- //

const getGrowth = (category, title) => (
  getList(milestones[category].flatMap((e, i) => getMilestones(i, title)), title) || null
);

// ------ Route export functions to format functions ---- //

const printItem = (category, index) => {
  const development = ["ears", "eyes", "teeth", "mobility"];
  const needs = ["temperature", "litterTraining", "socialization", "veterinary"];
  const router = {
    concerns: () => getConcerns(concerns[index], index),
    weight: () => getWeight(weight[index], index),
    food: () => getFoodDetails(index),
    milestones: () => development.flatMap((title) => getMilestones(index, title)),
    needs: () => needs.flatMap((title) => getMilestones(index, title)),
    "upcoming concerns": () => (concerns.length ? concerns.flatMap((e, i) => getConcerns(e, i)) : []),
    "upcoming weight": () => {
      let prevIndex = 0;
      return weight.length ? weight.flatMap((e, i) => {
        if (i === 0 || i - prevIndex >= 7) {
          prevIndex = i;
          return getWeight(e, i);
        } return [];
      }, []) : [];
    },
    "upcoming food": () => getFutureFoodDetails(),
    "upcoming milestones": () => development.flatMap((e, i) => getGrowth(e, development[i])),
    "upcoming needs": () => needs.flatMap((e, i) => getGrowth(e, needs[i])),
  };
  const result = [router[category]()].flat();
  return result.length ? result : noresult(category, index);
};

// -------------- final return before export --------------- //

const getDetail = (category, index = 0) => {
  let result = printItem(category, index) || noresult(category, index);
  const key = `${category}${index}`;
  result = (
    <li key={key} data-testid={category} className={listItemClass}>
      <h5 key="title" className="card-subtitle text-center">{category}</h5>
      <ul key="list" className="list-group list-group-flush">{result}</ul>
    </li>
  );
  return result;
};

// ------------------ exports ----------------------- //

export const formattedDevelopment = (kitten) => {
  initKitten(kitten);
  return [
    getDetail("upcoming milestones"),
    getDetail("upcoming weight"),
  ];
};

export const formattedFutureNeeds = (kitten) => {
  initKitten(kitten);
  return [
    getDetail("upcoming food"),
    getDetail("upcoming concerns"),
    getDetail("upcoming needs"),
  ];
};

export const formattedStatus = (kitten) => {
  initKitten(kitten);
  return [
    getDetail("milestones", 0),
    getDetail("weight", 0),
  ];
};

export const formattedNeeds = (kitten) => {
  initKitten(kitten);
  return [
    getDetail("food", 0),
    getDetail("concerns", 0),
    getDetail("needs", 0),
  ];
};
