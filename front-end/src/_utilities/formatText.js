/* Utility functions for taking an entry and returning the appropriate string */

const printArray = (prev, curr, entry, arr) => (entry === arr.length - 1 ? `${prev}, and ${curr}` : `${prev}, ${curr}`);

export const mobility = (entry, date, name) => `${name} should be ${entry.desc} ${date}`;

export const teeth = (entry, date, name) => `${name} should ${entry.desc} ${date}`;

export const ears = (entry, date, name) => `${name}'s ears should be ${entry.desc} ${date}`;

export const eyes = (entry, date, name) => `${name}'s eyes should be ${entry.desc} ${date}`;

export const temperature = (entry, date, name) => `${name}'s environment should be kept between ${entry.desc[0]} and ${entry.desc[1]} F ${date}`;

export const food = (type, cap, freq, date, name) => `${date}, ${name} should be eating ${cap.desc} of ${type.desc} ${freq.desc}.`;

export const wean = (entry, date, name) => (entry.desc ? `${date}, ${name} is weaning! Have plenty of kitten food available at all times, and supplement with milk.` : null);

export const concerns = (entry, date) => `${date}, watch out for signs of ${entry.desc.reduce(printArray)}`;

export const weight = (entry, date, name) => {
  const g = entry.desc;
  const lb = Number.parseFloat(g / 454).toPrecision(2);
  return `${name} should weigh at least ${g}g (about ${lb}lb) ${date}`;
};

export const any = (entry, date, name) => `${name} ${entry.desc} ${date}`;

export const litterTraining = any;
export const socialization = any;
export const veterinary = any;
