const React = require("react");
const { getCurrentItems, getLastItem } = require("./get");

let name, age, milestones, food, concerns, weight;
const listItemClass = "list-group-item list-group-item-light flex-grow-1";

// ------------ Utilities --------------
const getDetail = (category) => {
  return (
    <li key={category} className={listItemClass}>
      <h6 className="card-subtitle text-muted text-center">{category}</h6>
      <ul className="list-group list-group-flush">{printItem(category)}</ul>
    </li>
  );
};

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

// --------- Needs -----------
const getNeeds = (kitten) => {
  const result = [];
  ({ name, sex, birthdate, age, id, milestones, food, concerns, weight } =
    kitten);

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
      <li key={"food"} className={listItemClass}>
        {details}
      </li>
    );
  }

  if (weaning) {
    let weanDetails = `${name} is weaning! Gradually introduce wet and/or dry kitten food.`;
    result.push(
      <li key={"weaning"} className={listItemClass}>
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
      <li key={concerns} className={listItemClass}>
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
      <li key={n} className={listItemClass}>
        {n}
      </li>
    );
  }

  return result;
};

// ------------ Status -------------
const getStatus = (kitten) => {
  const result = [];
  ({ name, sex, birthdate, age, id, milestones, food, concerns, weight } =
    kitten);

  result.push(getDetail("milestones"));
  result.push(getDetail("weight"));

  return result;
};

const getWeight = () => {
  if (weight.length) {
    const g = weight.reduce(getLastItem)[0];
    const lb = Number.parseFloat(g / 454).toPrecision(2);
    return [
      <li key={weight} className={listItemClass}>
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
  if (mobility) devDetails.push(`${name} should be ${mobility[0]}`);
  return devDetails;
};

const getMilestones = () => {
  let devDetails = getMilestoneDetails();
  let result = [];

  for (let n of devDetails) {
    result.push(
      <li key={n} className={listItemClass}>
        {n}
      </li>
    );
  }

  return result;
};

module.exports = { getNeeds, getStatus };
