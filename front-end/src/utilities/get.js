const getLastItem = (a, b) => {
  let aAgeDiff = a[1] - this.age,
    bAgeDiff = b[1] - this.age;
  if (Math.abs(bAgeDiff) < Math.abs(aAgeDiff)) return b;
  else {
    if (bAgeDiff > 0) return a;
    else return b;
  }
};

const getCurrentItems = (source) => {
  let newObj = {};

  for (let n in source)
    if (source[n].length) newObj[n] = source[n].reduce(getLastItem);

  return newObj;
};

const getDate = (date) => {
  let newDate = new Date(date);
  const dd = String(newDate.getDate()).padStart(2, "0");
  const mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yy = newDate.getFullYear();
  newDate = mm + "/" + dd + "/" + yy;
  return newDate;
};

module.exports = { getLastItem, getCurrentItems, getDate };
