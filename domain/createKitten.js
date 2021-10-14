/*
this module contains all possible kitten data
and returns only the applicable data when getData is called
*/

import { Kitten } from "./kitten.js";
class KittenGrowth {

  constructor(birthdate, name, sex, id) {
    this = { ...Kitten };
    this.name = name;
    this.sex = sex;
    this.id = id;
    this.age = this.getAge(birthdate);
    this.birthdate = birthdate;
    this.weight = [];
    this.generateData();
    this.reduceObj(this.milestones);
    this.reduceObj(this.food);
    this.concerns = this.reduceGrowth(this.concerns);
  }

  generateData = () => {
    let ageCounter = this.age;
    const weight = [];
    while (ageCounter < 86) {
      weight.push({
        age: ageCounter,
        desc: Math.floor(50 + (100 / 7) * ageCounter),
      });
      ageCounter += 1;
    }
    this.weight = weight.length ? weight : [{
      age: this.age,
      desc: Math.floor(50 + (100 / 7) * this.age),
    }];
  };

  getAge = (birthdate) => {
    const today = new Date();
    const dob = new Date(birthdate);
    return Math.ceil((today - dob) / (1000 * 60 * 60 * 24));
  };

  getPrevItem = (a, b) => {
    const aAgeDiff = a.age - this.age;
    const bAgeDiff = b.age - this.age;
    if (bAgeDiff >= 0 && aAgeDiff < 0) return a;

    if (Math.abs(bAgeDiff) < Math.abs(aAgeDiff)) return b;
    return a;
  };

  reduceGrowth = (prop) => {
    // delete all items that are below the current age
    const filteredProp = prop.filter((entry) => entry.age >= this.age);
    // get the most recent item below the current age
    const prevItem = prop.reduce(this.getPrevItem);
    // if the filtered array doesn't contain it already, add it
    if (!filteredProp.includes(prevItem)) { filteredProp.unshift(prevItem); }
    // if the filtered array is still empty, add the last item in the props list
    return filteredProp.length ? filteredProp : [prop.pop()];
  };

  reduceObj = (prop) => {
    for (const m in prop) if (prop[m].length) prop[m] = this.reduceGrowth(prop[m]);
  };
}

const createKitten = (name, sex, birthdate, id) => new KittenGrowth(birthdate, name, sex, id);

// console.log(reduceData("09/01/2021"));
export default createKitten;
