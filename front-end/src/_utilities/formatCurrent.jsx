/* eslint-disable linebreak-style */
const React = require("react");

let name; let age; let milestones; let food; let concerns; let
  weight;
const listItemClass = "list-group-item list-group-item-light flex-grow-1";

const getListItems = (details) => (
  details.map((n) => (
    <li key={n} className={listItemClass}>
      {n}
    </li>
  )));

// --------- Needs -----------
const getFoodDetails = () => {
  const {
    foodtype, capacity, frequency, weaning,
  } = food;
  const result = [];

  if (foodtype && capacity && frequency) {
    const details = `${name} should be eating ${capacity[0].desc} of ${foodtype[0].desc} ${frequency[0].desc}.`;
    result.push(
      <li key="food" className={listItemClass}>
        {details}
      </li>,
      weaning && (
        <li key="weaning" className={listItemClass}>
          {`${name} is weaning! Have plenty of kitten food available at all times, and supplement with milk.`}
        </li>
      ),
    );
  }

  return result;
};
const printArray = (prev, curr, i, arr) => (i === arr.length - 1 ? `${prev}, and ${curr}` : `${prev}, ${curr}`);

const getConcerns = () => {
  if (concerns.length) {
    return [
      <li key={concerns} className={listItemClass}>
        {`Watch out for signs of ${concerns[0].desc.reduce(printArray)}`}
      </li>,
    ];
  } return [];
};

const getDevelopmentalNeeds = () => {
  const devDetails = [];
  const {
    temp, litter, social, vet,
  } = milestones;

  if (temp) {
    devDetails.push(
      `${name}'s environment should be kept between ${temp[0].desc[0]} and ${temp[0].desc[1]} F`,
    );
  }
  if (litter) devDetails.push(`${name} ${litter[0].desc}`);
  if (social) devDetails.push(`${name} ${social[0].desc}`);
  if (vet) {
    const days = vet[0].age - age;
    devDetails.push(
      `${name} ${vet[0].desc} in ${days} days`,
    );
  }
  return getListItems(devDetails);
};

// ------------ Status -------------

const getWeight = () => {
  if (weight.length) {
    const g = weight[0].desc;
    const lb = Number.parseFloat(g / 454).toPrecision(2);
    return [
      <li key={weight} className={listItemClass}>
        {`${name} should weigh around ${g}g (about ${lb}lb)`}
      </li>,
    ];
  } return [];
};

const getMilestones = () => {
  const {
    eyes, ears, teeth, mobility,
  } = milestones;

  const devDetails = [];
  if (eyes) devDetails.push(`${name}'s eyes should be ${eyes[0].desc}`);
  if (ears) devDetails.push(`${name}'s ears should be ${ears[0].desc}`);
  if (teeth) devDetails.push(`${name} should ${teeth[0].desc}`);
  if (mobility) devDetails.push(`${name} should be ${mobility[0].desc}`);
  return getListItems(devDetails);
};

// ------------ Utilities --------------

const printItem = (item) => {
  let result = [];
  const noresult = <li className={listItemClass}>No data!</li>;
  if (item === "concerns") result = getConcerns();
  else if (item === "weight") result = getWeight();
  else if (item === "milestones") result = getMilestones();
  else if (item === "food") result = getFoodDetails();
  else if (item === "development") result = getDevelopmentalNeeds();
  return result.length ? result : noresult;
};

const getDetail = (category) => (
  <li key={category} className={listItemClass}>
    <h6 className="card-subtitle text-muted text-center">{category}</h6>
    <ul className="list-group list-group-flush">{printItem(category)}</ul>
  </li>
);

const getStatus = (kitten) => {
  const result = [];
  ({
    name, age, milestones, food, concerns, weight,
  } = kitten);

  result.push(getDetail("milestones"));
  result.push(getDetail("weight"));

  return result;
};

const getNeeds = (kitten) => {
  const result = [];
  ({
    name, age, milestones, food, concerns, weight,
  } = kitten);

  result.push(getDetail("food"));
  result.push(getDetail("concerns"));
  result.push(getDetail("development"));

  return result;
};

module.exports = { getNeeds, getStatus };
