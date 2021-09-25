class Kitten {
  initMilestones(age) {
    let { temperature, eyes, ears, teeth, litterbox, mobility, socialization } =
      this.milestones;

    if (!temperature.length) {
      if (age < 7) temperature.push([85, age, 90]);
      else if (age < 14) temperature.push([80, age, 85]);
      else if (age < 21) temperature.push([75, age, 80]);
      else temperature.push([70, age, 75]);
    }

    if (!teeth.length) {
      if (age < 21) teeth.push(["none", age]);
      else if (age < 28) teeth.push(["incisors", age]);
      else if (age < 35) teeth.push(["canines", age]);
      else if (age < 42) teeth.push(["premolars", age]);
      else teeth.push(["all milk teeth", age]);
    }

    if (!eyes.length) {
      if (age < 7) eyes.push(["closed", age]);
      else if (age < 14) eyes.push(["partially open", age]);
      else eyes.push(["open, blue", age]);
    }

    if (!ears.length) {
      if (age < 7) ears.push(["closed", age]);
      else if (age < 21) ears.push(["partially open", age]);
      else ears.push(["open, upright", age]);
    }

    if (!litterbox.length) {
      if (age < 14) litterbox.push(["stimulate", age]);
      else if (age < 28) litterbox.push(["training", age]);
      else litterbox.push(["clay litter only", age]);
    }

    if (!mobility.length) {
      if (age < 4) mobility.push(["sleeping", age]);
      else if (age < 7) mobility.push(["purring", age]);
      else if (age < 14) mobility.push(["crawling", age]);
      else if (age < 28) mobility.push(["wobbly", age]);
      else if (age < 35) mobility.push(["walking", age]);
      else if (age < 42) mobility.push(["playful", age]);
      else mobility.push(["running", age]);
    }

    if (!socialization.length) {
      if (age < 14) socialization.push(["minimal handling", age]);
      else if (age < 21) socialization.push(["frequent handling", age]);
      else socialization.push(["acclimation period", age]);
    }
  }

  initConcerns(age) {
    if (!this.concerns.length) {
      if (age < 28)
        this.concerns.push(["hypothermia, lethargy, diarrhea, vomiting", age]);
      else
        this.concerns.push(["diarrhea, vomiting, developmental delays", age]);
    }
  }

  initFood(age) {
    const { foodtype, frequency, weaning } = this.food;

    if (!foodtype.length) {
      if (age < 28) foodtype.push(["milk", age]);
      else if (age < 42) foodtype.push(["milk / kitten food", age]);
      else foodtype.push(["kitten food", age]);
    }

    if (!frequency.length) frequency.push([2 + Math.floor((age * 1) / 7), age]);

    if (!weaning.length) {
      if (age < 28) weaning.push([false, age]);
      else if (age < 42) weaning.push([true, age]);
    }
  }

  initStatus(age) {
    this.initFood(age);
    this.initConcerns(age);
    this.initMilestones(age);
  }

  estimateGrowth() {
    // start estimation at current age
    let age = this.age;
    const {
      temperature,
      eyes,
      ears,
      teeth,
      litterbox,
      mobility,
      socialization,
      vet,
    } = this.milestones;
    const { foodtype, capacity, frequency, weaning } = this.food;

    while (age <= 42) {
      // weekly & variable estimations
      switch (age) {
        // ages 0 - 7 handled by initialization function
        case 7:
          mobility.push(["crawling", age]);
          ears.push(["partially open", age]);
          eyes.push(["partially open", age]);
          temperature.push([80, age, 85]);
          frequency.push([3, age]);
          break;
        case 14:
          socialization.push(["frequent handling", age]);
          mobility.push(["wobbly", age]);
          litterbox.push(["training", age]);
          eyes.push(["open, blue", age]);
          temperature.push([75, age, 80]);
          frequency.push([4, age]);
          break;
        case 21:
          socialization.push(["acclimation period", age]);
          ears.push(["open, upright", age]);
          teeth.push(["incisors", age]);
          frequency.push([5, age]);
          temperature.push([70, age, 75]);
          break;
        case 28:
          mobility.push(["walking", age]);
          litterbox.push(["clay litter only", age]);
          teeth.push(["canines", age]);
          frequency.push([6, age]);
          this.concerns.push(["diarrhea, vomiting, developmental delays", age]);
          break;
        case 35:
          mobility.push(["playful", age]);
          foodtype.push(["milk / kitten food", age]);
          weaning.push([true, age]);
          teeth.push(["premolars", age]);
          break;
        case 42:
          mobility.push(["running", age]);
          teeth.push(["all milk teeth", age]);
          foodtype.push(["kitten food", age]);
          weaning.push([false, age]);
          vet.push(["First visit", age]);
          break;
      }
      // catch any initializations missed by switch
      if (age === this.age) this.initStatus(age);

      // daily estimations
      capacity.push([2 + Math.floor((age * 4) / 7), age]);
      console.log("we do reach the weight line");
      this.weight.push([Math.floor(50 + (100 / 7) * age), age]);
      age++;
    }

    // a few estimates > 42 days (6 weeks)
    frequency.push([8, 84]);
    mobility.push(["coordinated", 49]);
    vet.push(["Second visit", 63]);
    vet.push(["Third visit", 84]);
  }

  constructor(dob, name = "Name me!", sex = "NA") {
    this.name = name;
    this.sex = sex;
    this.birthdate = JSON.stringify(dob);
    this.age = Math.ceil((new Date() - dob) / (1000 * 60 * 60 * 24));
    this.milestones = {
      temperature: [],
      eyes: [],
      ears: [],
      teeth: [],
      litterbox: [],
      mobility: [],
      socialization: [],
      vet: [],
    };
    this.food = {
      foodtype: [],
      capacity: [],
      frequency: [],
      weaning: [],
    };
    this.concerns = [];
    this.weight = [];
    this.estimateGrowth();
  }
}

const getGrowth = (newKitten) => {
  let kitkat = new Kitten(newKitten.birthdate);
  const growth = ["milestones", "food", "concerns", "weights"];
  for (let g of growth) for (let item of newKitten[g]) item = kitkat[g][i];
  return newKitten;
};

module.exports = getGrowth;
