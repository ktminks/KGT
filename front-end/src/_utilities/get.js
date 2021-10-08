// const getLastItem = (a, b) => {
//   const aAgeDiff = a[1] - this.age;
//   const bAgeDiff = b[1] - this.age;
//   if (bAgeDiff > 0 && aAgeDiff <= 0) return a;

//   if (Math.abs(bAgeDiff) < Math.abs(aAgeDiff)) return b;
//   return a;
// };

// const getCurrentItems = (source) => {
//   const newObj = source.reduce((n) => n[0]);

//   for (const n in source) { if (source[n].length) newObj[n] = source[n].reduce(getLastItem); }

//   return newObj;
// };

const getDate = (date) => {
  let newDate = new Date(date);
  const dd = String(newDate.getDate()).padStart(2, "0");
  const mm = String(newDate.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yy = newDate.getFullYear();
  newDate = `${mm}/${dd}/${yy}`;
  return newDate;
};

export default getDate;
