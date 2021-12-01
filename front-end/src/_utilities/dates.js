export const getNumDays = (currAge, age) => {
  const days = currAge - age;

  const dateFormats = {
    0: "as of today",
    1: "beginning tomorrow",
    default: () => (days > 0 ? `in ${days} days` : `as of ${days * -1} days ago`),
  };

  const date = (dateFormats[days] || dateFormats.default());
  return [days, date];
};

export const isSoon = (currAge, age) => {
  const [days, date] = getNumDays(currAge, age);
  return days <= 30 && days >= -30 ? date : null;
};

export const getDate = (date) => {
  let newDate = new Date(date);
  const dd = String(newDate.getDate()).padStart(2, "0");
  const mm = String(newDate.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yy = newDate.getFullYear();
  newDate = `${mm}/${dd}/${yy}`;
  return newDate;
};

export const getBirthdate = (age) => {
  const today = new Date();
  const date = new Date();
  date.setDate(today.getDate() - age);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
