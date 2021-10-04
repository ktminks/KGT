const Kitten = require("./kitten");

class KittenGrowth extends Kitten {
  notUnderAge = (entry) => entry[1] >= this.age;

  getPrevItem = (a, b) => {
    let aAgeDiff = a[1] - this.age,
      bAgeDiff = b[1] - this.age;
    if (bAgeDiff >= 0 && aAgeDiff < 0) return a;
    else {
      if (Math.abs(bAgeDiff) < Math.abs(aAgeDiff)) return b;
      else return a;
    }
  };

  reduceGrowth = function (prop) {
    let filteredProp = prop.filter(this.notUnderAge);
    const prevItem = prop.reduce(this.getPrevItem);
    console.log(prevItem);
    filteredProp.unshift(prevItem);
    return filteredProp.length ? filteredProp : [prop.pop()];
  };

  reduceObj = function (prop) {
    for (let m in prop) prop[m] = this.reduceGrowth(prop[m]);
  };

  getData = function () {
    this.reduceObj(this.milestones);
    this.reduceObj(this.food);
    this.concerns = this.reduceGrowth(this.concerns);
    this.weight = this.reduceGrowth(this.weight);
  };

  getAge = (birthdate) => {
    const today = new Date();
    const dob = new Date(birthdate);
    return Math.ceil((today - dob) / (1000 * 60 * 60 * 24));
  };

  constructor(birthdate, name, sex, age) {
    super();
    this.name = name;
    this.sex = sex;
    this.age = age ? age : this.getAge(birthdate);
    this.birthdate = JSON.stringify(birthdate);
    this.getData();
  }
}

const getGrowth = (birthdate, name, sex, age) =>
  new KittenGrowth(birthdate, name, sex, age);

module.exports = getGrowth;
