const printItem = (item) => {
  let result = [];
  const noresult = <li className="list-group-item">No data!</li>;
  if (item === "concerns") result = getConcerns();
  else if (item === "weight") result = getWeight();
  else if (item === "milestones") result = getObject(milestones);
  else if (item === "food") result = getObject(food);
  return result.length ? result : noresult;
};

const getConcerns = () => {
  if (concerns.length) {
    const c = concerns[0][0];
    return [
      <li key={concerns} className="list-group-item">
        <div className="d-flex justify-content-between flex-row">
          <div>{`Today, ${name}'s biggest concern is ${c}`}</div>
        </div>
      </li>,
    ];
  } else return [];
};

const getWeight = () => {
  if (weight.length) {
    const g = weight[0][0];
    const lb = Math.round(g / 454);
    return [
      <li key={weight} className="list-group-item">
        <div className="d-flex justify-content-between flex-row">
          <div>
            {`Today, ${name} should weigh around ${g}g (about ${lb}lb)`}
          </div>
        </div>
      </li>,
    ];
  } else return [];
};

const getObject = (obj) => {
  let result = [];
  for (let n in obj)
    if (obj[n].length) {
      let data = obj[n];
      result.push(getDetail(n, data));
    }
  return result;
};

const formatMilestoneDetails = (category, data) => {
  switch (category) {
    case "temperature":
      break;
    case "eyes":
      break;
    case "ears":
      break;
    case "teeth":
      break;
    case "litterbox":
      break;
    case "mobility":
      break;
    case "socialization":
      break;
    case "vet":
      break;
  }
};

const formatFoodDetails = (category, data) => {
  let detail = "";
  switch (category) {
    case "foodtype":
      detail = `${name} should be eating`;
      break;
    case "capacity":
      break;
    case "frequency":
      break;
    case "weaning":
      break;
  }
};

const getDetail = (title, data, detail) => {
  return (
    <li key={title} className="list-group-item">
      <div className="d-flex justify-content-between flex-wrap">
        <h6>{title}:</h6>
        <div className="ms-auto w-75">{getFirstOfArray(data)}</div>
      </div>
    </li>
  );
};

const getFirstOfArray = (arr) => {
  if (arr.length) {
    let item = arr[0];
    const days = item[1] - age;
    return (
      <div className="d-flex justify-content-between flex-row">
        <div>{item[0]}</div>
        <div>{days === 0 ? "today" : `in ${days} days`}</div>
      </div>
    );
  }
  return;
};

const getDate = (date) => {
  let newDate = new Date(date);
  const dd = String(newDate.getDate()).padStart(2, "0");
  const mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yy = newDate.getFullYear();
  newDate = mm + "/" + dd + "/" + yy;
  return newDate;
};
