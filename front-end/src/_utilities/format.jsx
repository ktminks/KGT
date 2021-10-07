/* eslint-disable linebreak-style */
const React = require("react");

// ------------ Utilities --------------

let name; let age; let milestones; let food; let concerns; let
  weight;
const listItemClass = "list-group-item list-group-item-light flex-grow-1";
const noresult = (key) => <li className={listItemClass} key={`${key}-nil`}>No data!</li>;

const getListItems = (details, i) => {
  let list = (details.length) ? (details.map((n, i) => {
    if (Array.isArray(n)) return getListItems(n, i);
    if (n !== undefined) 
      return (<li key={i} className={listItemClass}>
        {n}
      </li>)
  })) : i && noresult(i);
return list;};

const printArray = (prev, curr, i, arr) => (i === arr.length - 1 ? `${prev}, and ${curr}` : `${prev}, ${curr}`);
const getNumDays = (currAge) => {
  const days = currAge - age;
  const date = days > 0 ? `in ${days} days` : days < 0 ? `as of ${days * -1} days ago` : "today";
  return [days, date];
};

// -------------- Needs -------------------
const getFoodDetails = (entry) => {
  const {
    foodtype, capacity, frequency, weaning,
  } = food;
  const result = [];

  if (foodtype.length && capacity.length && frequency.length) {
    const details = `${name} should be eating ${capacity[0].desc} of ${foodtype[0].desc} ${frequency[0].desc}.`;
    result.push(getListItems([details]),
      weaning[0].desc && (
        <li key="weaning" className={listItemClass}>
          {`${name} is weaning! Have plenty of kitten food available at all times, and supplement with milk.`}
        </li>
      ),
    );
  }

  return result;
};

const getConcerns = (entry) => {
  const days = getNumDays(entry.age);
    return (
      <li key={entry.age} className={listItemClass}>
        {`Watch out for signs of ${entry.desc.reduce(printArray)} ${days[1]}`}
      </li>
    )
};

const getDevelopmentalNeeds = () => {
  const { temp, litter, social, vet } = milestones;
  const needs = [temp, litter, social, vet];
  const titles = ["temperature", "litter training", "socialization", "veterinary"];

  let devDetails = needs.map((n, i) => {
    if (n.length) {
      const days = getNumDays(n[0].age);
      if (days[0] >= -100 && days[0] <= 30) {
        if (n[0].desc.length == 2) 
          return `${name}'s environment should be kept between ${n[0].desc[0]} and ${n[0].desc[1]} F ${days[1]}`;
        else return(`${name} ${n[0].desc} ${days[1]}`);
      }
    }
  });
  return getListItems(devDetails);
};

// ------------ Status -------------

const getWeight = (entry) => {
    const g = entry.desc;
    const lb = Number.parseFloat(g / 454).toPrecision(2);
    const days = getNumDays(entry.age);
    return (
      <li key={entry.age} className={listItemClass}>
        {`${name} should weigh around ${g}g (about ${lb}lb) ${days[1]}`}
      </li>
    );
};

const getMilestones = (entry) => {
  const { eyes, ears, teeth, mobility} = milestones;
  const date = getNumDays();

  const devDetails = [];
  if (eyes) devDetails.push(`${name}'s eyes should be ${eyes[0].desc} ${date[1]}`);
  if (ears) devDetails.push(`${name}'s ears should be ${ears[0].desc} ${date[1]}`);
  if (teeth) devDetails.push(`${name} should ${teeth[0].desc} ${date[1]}`);
  if (mobility) devDetails.push(`${name} should be ${mobility[0].desc} ${date[1]}`);
  return getListItems(devDetails);
};

// ------------ Growth ---------------

const getUpcomingNeeds = (entry) => {
  const devDetails = [];
  const days = getNumDays(entry.age);

  if (entry.desc.length == 2)
    devDetails.push(
      `${name}'s environment should be kept between ${entry.desc[0]} and ${entry.desc[1]} F ${days[1]}`,
    );
  else
    devDetails.push(
      `${name} ${entry.desc} ${days[1]}`,
    );
  return devDetails;
};

const getGrowth = (type) => {
  let arr, func, titles, age, devDetails = [];
  if (type === "development") {
    const { temp, litter, social, vet } = milestones;
    arr = [temp, litter, social, vet];
    titles = ["temperature", "litter training", "socialization", "veterinary"];
    func = getUpcomingNeeds;
  }

  arr.map((n, i) => {
    devDetails.push([`${titles[i]}:`], n.length &&
      (n.flatMap((e) => {
        age = getNumDays(e.age)[0];
        return (age <= 30 && age >= -30) ? func(e) : [];
        })
      )
  )});
  return getListItems(devDetails);
}

// ------------ Print & Export --------------

const printItem = (item) => {
  let result = [];
  const category = item.split(" ");
  switch (category[0]) {
    case "concerns":
      if (concerns.length) result.push(getConcerns(concerns[0]));
      break;
    case "weight":
      if (weight.length) result.push(getWeight(weight[0]));
      break;
    case "milestones":
      result.push(getMilestones());
      break;
    case "food":
      result.push(getFoodDetails());
      break;
    case "development":
      result.push(getDevelopmentalNeeds());
      break;
    case "upcoming":

      switch (category[1]) {
        case "concerns":
          if (concerns.length)
            result.push(concerns.map(c => getNumDays(c.age)[0] <= 14 && getConcerns(c)));
          break;
        case "weight":
          if (weight.length) 
            result.push(weight.map(w => getNumDays(w.age)[0] <= 14 && getWeight(w)));
          break;
        case "milestones":
          result.push(getMilestones());
          break;
        case "food":
          result.push(getFoodDetails());
          break;
        case "development":
          result.push(getGrowth("development"));
          break;
      }
  }
  return result.length ? result : noresult;
};

const getDetail = (category) => (
  <li key={category} className={listItemClass}>
    <h6 className="card-subtitle text-muted text-center">{category}</h6>
    <ul className="list-group list-group-flush">{printItem(category)}</ul>
  </li>
);

export const getDevelopment = (kitten) => {
  const result = [];
  ({
    name, age, milestones, food, concerns, weight,
  } = kitten);

  result.push(getDetail("upcoming milestones"));
  result.push(getDetail("upcoming weight"));

  return result;
};

export const getFutureNeeds = (kitten) => {
  const result = [];
  ({
    name, age, milestones, food, concerns, weight,
  } = kitten);

  result.push(getDetail("upcoming food"));
  result.push(getDetail("upcoming concerns"));
  result.push(getDetail("upcoming development"));

  return result;
};

export const getStatus = (kitten) => {
  const result = [];
  ({
    name, age, milestones, food, concerns, weight,
  } = kitten);

  result.push(getDetail("milestones"));
  result.push(getDetail("weight"));

  return result;
};

export const getNeeds = (kitten) => {
  const result = [];
  ({
    name, age, milestones, food, concerns, weight,
  } = kitten);

  result.push(getDetail("food"));
  result.push(getDetail("concerns"));
  result.push(getDetail("development"));

  return result;
};

// ------------ List Kittens -------------
export const printKittens = (kittens, handleSetActive, currentIndex) => {
  const printKitten = (kitten, index) => {
    const currentClass = `list-group-item list-group-item-action ${
      index === currentIndex ? "active" : ""
    }`;
    return (
      <li
        className={currentClass}
        onClick={() => handleSetActive(kitten, index)}
        key={index}
      >
        {kitten.name}
      </li>
    );
  };

  return (kittens && kittens.map(printKitten));
};
