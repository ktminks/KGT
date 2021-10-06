/* 
this module contains all possible kitten data 
and returns only the applicable data when getData is called
*/

let kittenData = {
  age: 0,
  milestones: {
    temp: [
      { age: 0, desc: [85, 90] },
      { age: 7, desc: [80, 85] },
      { age: 14, desc: [75, 80] },
      { age: 21, desc: [70, 75] }
    ],
    eyes: [
      { age: 0, desc: "closed" },
      { age: 7, desc: "partially open" },
      { age: 14, desc: "open and blue" },
      { age: 49, desc: "transitioning to adult eye color" }
    ],
    ears: [
      { age: 0, desc: "closed" },
      { age: 7, desc: "partially open" },
      { age: 21, desc: "open and upright" }
    ],
    teeth: [
      { age: 0, desc: "have no teeth" },
      { age: 21, desc: "start seeing incisors" },
      { age: 28, desc: "start seeing canines" },
      { age: 35, desc: "start seeing premolars" },
      { age: 42, desc: "have all their milk teeth" },
    ],
    litter: [
      { age: 2, desc: "needs to be stimulated after every meal" },
      { age: 14, desc: "should be introduced to a litter and placed in it after every meal" },
      { age: 28, desc: "should be using a litter on their own, but only using clay litter" },
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
    social: [
      { age: 2, desc: "should only be handled minimally" },
      { age: 14, desc: "should be handled frequently" },
      { age: 21, desc: "is at the best age for acclimation -- use this time to introduce new pets, people, foods, car rides, etc." },
      { age: 56, desc: "is old enough to be adopted!" }
    ],
    vet: [
      { age: 42, desc: "needs to see a vet for their first visit" },
      { age: 63, desc: "needs to see a vet for their second visit" },
      { age: 84, desc: "needs to see a vet for their third visit" }
    ],
  },
  food: {
    foodtype: [
      { age: 0, desc: "milk" },
      { age: 35, desc: "milk and/or kitten food" },
      { age: 42, desc: "kitten food" }
    ],
    capacity: [],
    frequency: [
      { age: 0, desc: "every 2 hours, including overnight" },
      { age: 7, desc: "every 3 hours, including overnight" },
      { age: 14, desc: "every 4 hours, including overnight" },
      { age: 21, desc: "every 5 hours" },
      { age: 28, desc: "every 6 hours" },
      { age: 84, desc: "every 8 hours" }
    ],
    weaning: [
      { age: 0, desc: false },
      { age: 35, desc: true },
      { age: 42, desc: false }
    ],
  },
  concerns: [
    { age: 0, desc: ["hypothermia", "lethargy", "diarrhea", "vomiting"] },
    { age: 28, desc: ["diarrhea", "vomiting", "developmental delays"] }
  ],
  weight: [],
}

generateData = function () {
  let age = kittenData.age;
  let capacity = [];
  let weight = [];
  while (age < 86) {
    capacity.push({
      age: age,
      desc: `${2 + Math.floor((age * 4) / 7)}ml`
    });
    weight.push({
      age: age,
      desc: Math.floor(50 + (100 / 7) * age)
    });
    age++;
  }
  kittenData.food.capacity = capacity;
  kittenData.weight = weight;
};

getKitten = function (birthdate) {
  kittenData.age = getAge(birthdate);
  generateData();
  console.log(kittenData.food.capacity);
  reduceObj(kittenData.milestones);
  reduceObj(kittenData.food);
  kittenData.concerns = reduceGrowth(kittenData.concerns);
  return kittenData;
}

const getAge = (birthdate) => {
  const today = new Date();
  const dob = new Date(birthdate);
  // console.log(today);
  return Math.ceil((today - dob) / (1000 * 60 * 60 * 24));
};

notUnderAge = (entry) => entry.age >= kittenData.age;

getPrevItem = function (a, b) {
  let aAgeDiff = a.age - kittenData.age,
    bAgeDiff = b.age - kittenData.age;
  if (bAgeDiff >= 0 && aAgeDiff < 0) return a;
  else {
    if (Math.abs(bAgeDiff) < Math.abs(aAgeDiff)) return b;
    else return a;
  }
};

reduceGrowth = function (prop) {
  let filteredProp = prop.filter(notUnderAge);
  const prevItem = prop.reduce(getPrevItem);
  // console.log(prevItem);
  filteredProp.unshift(prevItem);
  return filteredProp.length ? filteredProp : [prop.pop()];
};

reduceObj = function (prop) {
  for (let m in prop) if (prop[m].length) prop[m] = reduceGrowth(prop[m]);
};

// console.log(reduceData("09/01/2021"));
module.exports = getKitten;
