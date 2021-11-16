/*
this module contains all possible kitten data
and returns only the applicable data when getData is called
*/

const KittenData = {
  milestones: {
    temperature: [
      { age: 0, desc: [85, 90] },
      { age: 7, desc: [80, 85] },
      { age: 14, desc: [75, 80] },
      { age: 21, desc: [70, 75] },
    ],
    eyes: [
      { age: 0, desc: "closed" },
      { age: 7, desc: "partially open" },
      { age: 14, desc: "open and blue" },
      { age: 49, desc: "transitioning to adult eye color" },
    ],
    ears: [
      { age: 0, desc: "closed" },
      { age: 7, desc: "partially open" },
      { age: 21, desc: "open and upright" },
    ],
    teeth: [
      { age: 0, desc: "have no teeth" },
      { age: 21, desc: "start seeing incisors" },
      { age: 28, desc: "start seeing canines" },
      { age: 35, desc: "start seeing premolars" },
      { age: 42, desc: "have all their milk teeth" },
    ],
    litterTraining: [
      { age: 2, desc: "needs to be stimulated after every meal" },
      { age: 14, desc: "should be introduced to a litterbox and placed in it after every meal" },
      { age: 28, desc: "should be using a litterbox on their own, but only using clay litter" },
    ],
    mobility: [
      { age: 2, desc: "sleeping most of the time" },
      { age: 7, desc: "crawling around" },
      { age: 14, desc: "walking but wobbly" },
      { age: 28, desc: "walking confidently" },
      { age: 35, desc: "playful but clumsy" },
      { age: 42, desc: "running but clumsy" },
      { age: 49, desc: "well-coordinated and very playful" },
    ],
    socialization: [
      { age: 2, desc: "should only be handled minimally" },
      { age: 14, desc: "should be handled frequently" },
      { age: 21, desc: "is at the best age for acclimation -- use this time to introduce new pets, people, foods, car rides, etc." },
      { age: 56, desc: "is old enough to be adopted!" },
    ],
    veterinary: [
      { age: 42, desc: "needs to see a veterinary for their first visit" },
      { age: 63, desc: "needs to see a veterinary for their second visit" },
      { age: 84, desc: "needs to see a veterinary for their third visit" },
    ],
  },

  food: {
    foodtype: [
      { age: 0, desc: "milk" },
      { age: 35, desc: "milk and/or kitten food" },
      { age: 42, desc: "kitten food" },
    ],
    capacity: [
      { age: 0, desc: "2ml" },
      { age: 4, desc: "4ml" },
      { age: 7, desc: "6ml" },
      { age: 14, desc: "10ml" },
      { age: 21, desc: "14ml" },
      { age: 28, desc: "18ml" },
      { age: 35, desc: "23ml" },
      { age: 42, desc: "as much as they will eat" },
    ],
    frequency: [
      { age: 0, desc: "every 2 hours, including overnight" },
      { age: 7, desc: "every 3 hours, including overnight" },
      { age: 14, desc: "every 4 hours, including overnight" },
      { age: 21, desc: "every 5 hours" },
      { age: 28, desc: "every 6 hours" },
      { age: 84, desc: "every 8 hours" },
    ],
    weaning: [
      { age: 0, desc: false },
      { age: 35, desc: true },
      { age: 42, desc: false },
    ],
  },

  concerns: [
    { age: 0, desc: ["hypothermia", "lethargy", "diarrhea", "vomiting"] },
    { age: 28, desc: ["diarrhea", "vomiting", "developmental delays"] },
  ],

  weight: [],
};

const getWeight = (age) => {
  let ageCounter = age;
  const weight = [];

  while (ageCounter < 86) {
    weight.push({
      age: ageCounter,
      desc: Math.floor(50 + (100 / 7) * ageCounter),
    });
    ageCounter += 1;
  }

  if (!weight.length && age > 150) weight.push({ age, desc: 2300 });
  return weight.length
    ? weight
    : [{ age, desc: Math.floor(50 + (100 / 7) * age) }];
};

const getAge = (birthdate) => {
  const today = new Date();
  const dob = new Date(birthdate);
  return Math.ceil((today - dob) / (1000 * 60 * 60 * 24));
};

const reduceGrowth = (prop, age) => {
  // delete all items that are below the current age
  const filteredProp = prop.filter((entry) => entry.age >= age);

  // get the most recent item below the current age
  const getPrevItem = (a, b) => {
    const aAgeDiff = a.age - age;
    const bAgeDiff = b.age - age;
    // if next value is larger than current & previous value is smaller
    if (bAgeDiff >= 0 && aAgeDiff < 0) return a; // target value
    // if current value is closer to next value than to previous value
    if (Math.abs(bAgeDiff) < Math.abs(aAgeDiff)) return b;
    return a;
  };

  const prevItem = prop.reduce(getPrevItem);
  // if the filtered array doesn't contain it already, add it
  if (!filteredProp.includes(prevItem)) { filteredProp.unshift(prevItem); }
  // if the filtered array is still empty, add the last item in the props list
  return filteredProp.length ? filteredProp : [prop.pop()];
};

const reduceObj = (obj, age) => {
  const objKeys = Object.keys(obj);
  const newObj = {};
  objKeys.map((key) => {
    newObj[key] = reduceGrowth(obj[key], age);
    return newObj[key];
  });
  return newObj;
};

class Kitten {
  constructor(birthdate, name, sex, id) {
    const age = getAge(birthdate);
    this.age = age;
    this.name = name;
    this.sex = sex;
    this.id = id;
    this.birthdate = birthdate;
    this.weight = getWeight(age);
    this.milestones = reduceObj(KittenData.milestones, age);
    this.food = reduceObj(KittenData.food, age);
    this.concerns = reduceGrowth(KittenData.concerns, age);
  }
}

const getKitten = (kitten) => {
  const {
    birthdate, name, sex, id,
  } = kitten;
  return new Kitten(birthdate, name, sex, id);
};

export default getKitten;
