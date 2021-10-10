export const getNumDays = (currAge, age) => {
  const days = currAge - age;
  let date;
  if (days > 0) date = `in ${days} days`;
  else if (days < 0) date = `as of ${days * -1} days ago`;
  else date = "today";
  return [days, date];
};

export const isSoon = (currAge, age) => {
  const [days, date] = getNumDays(currAge, age);
  return days <= 30 && days >= -30 ? date : null;
};
