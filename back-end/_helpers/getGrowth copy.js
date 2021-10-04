const Kitten = require("./kitten");

class KittenGrowth extends Kitten {
  estimateGrowth = () => {};

  constructor(birthdate, name = "Name me!", sex = "N/A", age = 0) {
    this.name = name;
    this.sex = sex;
    this.birthdate = JSON.stringify(birthdate);
    this.age = age;
    this.estimateGrowth();
  }
}

const getGrowth = (name, sex, birthdate, age) =>
  new KittenGrowth(birthdate, name, sex, age);

module.exports = getGrowth;
