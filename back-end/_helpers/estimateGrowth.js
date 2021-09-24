class Kitten {
  getDate = (days) => {
    // accept # days, return date that this kitten will be that age
    const dob = new Date(JSON.parse(this.birthdate));
    let date = new Date(dob);
    date.setDate(dob.getDate() + days);
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yy = date.getFullYear();
    date = mm + "/" + dd + "/" + yy;
    return date;
  };

  initializeStatus = () => {
    let age = this.age;

    if (!this.food.foodtype.length) {
      if (age < 28) this.food.foodtype.push(["milk", age]);
      else if (age < 42)
        this.food.foodtype.push(["milk and / or kitten food", age]);
      else this.food.foodtype.push(["kitten food", age]);
    }
    if (!this.food.frequency.length)
      this.food.frequency.push([2 + Math.floor((age * 1) / 7), age]);
    if (!this.food.weaning.length) {
      if (age < 28) this.food.weaning.push([false, age]);
      else if (age < 42) this.food.weaning.push([true, age]);
    }

    if (!this.concerns.length) {
      if (age < 28)
        this.concerns.push(["hypothermia, lethargy, diarrhea, vomiting", age]);
      else
        this.concerns.push(["diarrhea, vomiting, developmental delays", age]);
    }

    if (!this.milestones.temperature.length) {
      if (age < 7) this.milestones.temperature.push([85, age, 90]);
      else if (age < 14) this.milestones.temperature.push([80, age, 85]);
      else if (age < 21) this.milestones.temperature.push([75, age, 80]);
      else this.milestones.temperature.push([70, age, 75]);
    }

    if (!this.milestones.teeth.length) {
      if (age < 21) this.milestones.teeth.push(["none", age]);
      else if (age < 28) this.milestones.teeth.push(["incisors", age]);
      else if (age < 35) this.milestones.teeth.push(["canines", age]);
      else if (age < 42) this.milestones.teeth.push(["premolars", age]);
      else this.milestones.teeth.push(["all milk (deciduous) teeth", age]);
    }

    if (!this.milestones.eyes.length) {
      if (age < 7) this.milestones.eyes.push(["closed", age]);
      else if (age < 14) this.milestones.eyes.push(["partially open", age]);
      else this.milestones.eyes.push(["open, blue", age]);
    }

    if (!this.milestones.ears.length) {
      if (age < 7) this.milestones.ears.push(["closed", age]);
      else if (age < 21) this.milestones.ears.push(["partially open", age]);
      else this.milestones.ears.push(["open, upright", age]);
    }

    if (!this.milestones.litterbox.length) {
      if (age < 14) this.milestones.litterbox.push(["stimulate", age]);
      else if (age < 28) this.milestones.litterbox.push(["training", age]);
      else this.milestones.litterbox.push(["clay litter only", age]);
    }

    if (!this.milestones.mobility.length) {
      if (age < 4) this.milestones.mobility.push(["sleeping", age]);
      else if (age < 7) this.milestones.mobility.push(["purring", age]);
      else if (age < 14) this.milestones.mobility.push(["crawling", age]);
      else if (age < 28) this.milestones.mobility.push(["wobbly", age]);
      else if (age < 35) this.milestones.mobility.push(["walking", age]);
      else if (age < 42) this.milestones.mobility.push(["playful", age]);
      else this.milestones.mobility.push(["running", age]);
    }

    if (!this.milestones.socialization.length) {
      if (age < 14)
        this.milestones.socialization.push(["minimal handling", age]);
      else if (age < 21)
        this.milestones.socialization.push(["frequent handling", age]);
      else
        this.milestones.socialization.push([
          "socialization, acclimation period",
          age,
        ]);
    }
  };

  estimateGrowth = () => {
    // start estimation at current age
    let age = this.age;

    while (age <= 42) {
      // weekly & variable estimations
      switch (age) {
        // ages 0 - 7 handled by initialization function
        case 7:
          this.milestones.mobility.push(["crawling", age]);
          this.milestones.ears.push(["partially open", age]);
          this.milestones.eyes.push(["partially open", age]);
          this.milestones.temperature.push([80, age, 85]);
          this.food.frequency.push([3, age]);
          break;
        case 14:
          this.milestones.socialization.push(["frequent handling", age]);
          this.milestones.mobility.push(["wobbly", age]);
          this.milestones.litterbox.push(["training", age]);
          this.milestones.eyes.push(["open, blue", age]);
          this.milestones.temperature.push([75, age, 80]);
          this.food.frequency.push([4, age]);
          break;
        case 21:
          this.milestones.socialization.push([
            "socialization, acclimation period",
            age,
          ]);
          this.milestones.ears.push(["open, upright", age]);
          this.milestones.teeth.push(["incisors", age]);
          this.food.frequency.push([5, age]);
          this.milestones.temperature.push([70, age, 75]);
          break;
        case 28:
          this.milestones.mobility.push(["walking", age]);
          this.milestones.litterbox.push(["clay litter only", age]);
          this.milestones.teeth.push(["canines", age]);
          this.food.frequency.push([6, age]);
          this.concerns.push(["diarrhea, vomiting, developmental delays", age]);
          break;
        case 35:
          this.milestones.mobility.push(["playful", age]);
          this.food.foodtype.push(["milk and / or kitten food", age]);
          this.food.weaning.push([true, age]);
          this.milestones.teeth.push(["premolars", age]);
          break;
        case 42:
          this.milestones.mobility.push(["running", age]);
          this.milestones.teeth.push(["all milk (deciduous) teeth", age]);
          this.food.foodtype.push(["kitten food", age]);
          this.food.weaning.push([false, age]);
          this.milestones.vet.push([1, age]);
          break;
      }
      // catch any initializations missed by switch
      if (age === this.age) this.initializeStatus();

      // daily estimations
      this.food.capacity.push([2 + Math.floor((age * 4) / 7), age]);
      this.weight.push([Math.floor(50 + (100 / 7) * age), age]);
      age++;
    }

    // a few estimates > 42 days (6 weeks)
    this.food.frequency.push([8, 84]);
    this.milestones.mobility.push(["coordinated", 49]);
    this.milestones.vet.push(["Second visit", 63]);
    this.milestones.vet.push(["Third visit", 84]);
  };

  getAge = (dob) => {
    // probs ensure dob is in the right format here first
    const today = new Date();
    this.age = Math.ceil((today - dob) / (1000 * 60 * 60 * 24));
  };

  getLastItem = (a, b) => {
    let aAgeDiff = a[1] - this.age,
      bAgeDiff = b[1] - this.age;
    if (Math.abs(bAgeDiff) < Math.abs(aAgeDiff)) return b;
    else {
      if (bAgeDiff > 0) return a;
      else return b;
    }
  };

  getNextItem = (a, b) => {
    let aAgeDiff = a[1] - this.age,
      bAgeDiff = b[1] - this.age;
    if (Math.abs(bAgeDiff) < Math.abs(aAgeDiff)) return b;
    else {
      if (bAgeDiff > 0 && aAgeDiff <= 0) return b;
      else return a;
    }
  };

  constructor(dob, name = "", sex = "") {
    this.name = name;
    this.sex = sex;
    this.getAge(dob);
    this.birthdate = JSON.stringify(dob);
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

  getKitten = () => {
    return `Kitten name: ${this.name}
        Sex: ${this.sex}
        Birthdate: ${this.getDate(0)}
        Age: ${this.age} days (about ${Math.round(this.age / 7)} weeks)`;
  };

  getCurrentNeeds = () => {
    const concerns = this.concerns.reduce(this.getLastItem),
      foodtype = this.food.foodtype.reduce(this.getLastItem),
      capacity = this.food.capacity.reduce(this.getLastItem),
      frequency = this.food.frequency.reduce(this.getLastItem),
      temp = this.milestones.temperature.reduce(this.getLastItem),
      litterbox = this.milestones.litterbox.reduce(this.getLastItem),
      socialization = this.milestones.socialization.reduce(this.getLastItem),
      vet = this.milestones.vet.reduce(this.getLastItem);

    const food =
      this.age < 28
        ? `fed at least ${capacity[0]}ml of ${foodtype[0]}, at least every ${frequency[0]} hours, including overnight.`
        : `eating as much as they are willing to eat of ${foodtype[0]}, every ${frequency[0]} hours.`;

    return `Food: ${this.name} should be ${food}
        Temperature: Bedding should be kept around ${temp[0]}-${temp[2]} F.
        Concerns: Watch out for ${concerns[0]}.
        Litter training: ${litterbox[0]}
        Socialization: ${socialization[0]}
        Vet: ${vet[0]} on ${this.getDate(vet[1])}`;
  };

  getCurrentStatus = () => {
    const weight = this.weight.reduce(this.getLastItem),
      eyes = this.milestones.eyes.reduce(this.getLastItem),
      ears = this.milestones.ears.reduce(this.getLastItem),
      teeth = this.milestones.teeth.reduce(this.getLastItem),
      mobility = this.milestones.mobility.reduce(this.getLastItem);

    return `Weight: ${this.name} should weigh at least ${weight[0]}g.
        Eyes: ${eyes[0]}
        Ears: ${ears[0]}
        Teeth: ${teeth[0]}
        Mobility: ${mobility[0]}`;
  };

  getNextChanges = () => {
    const weight = this.weight.reduce(this.getNextItem),
      eyes = this.milestones.eyes.reduce(this.getNextItem),
      ears = this.milestones.ears.reduce(this.getNextItem),
      teeth = this.milestones.teeth.reduce(this.getNextItem),
      mobility = this.milestones.mobility.reduce(this.getNextItem),
      concerns = this.concerns.reduce(this.getNextItem),
      foodtype = this.food.foodtype.reduce(this.getNextItem),
      capacity = this.food.capacity.reduce(this.getNextItem),
      frequency = this.food.frequency.reduce(this.getNextItem),
      temp = this.milestones.temperature.reduce(this.getNextItem),
      litterbox = this.milestones.litterbox.reduce(this.getNextItem),
      socialization = this.milestones.socialization.reduce(this.getNextItem),
      vet = this.milestones.vet.reduce(this.getNextItem);

    return `Needs:
    Food: ${this.name} should transition to eating:
    ${this.getDate(capacity[1])}: ${capacity[0]} ml of food
    ${this.getDate(frequency[1])}: every ${frequency[0]} hours
    ${this.getDate(foodtype[1])}: ${foodtype[0]}
    Temperature:
    ${this.getDate(temp[1])}: changes to ${temp[0]}-${temp[2]} F 
    Concerns:
    ${this.getDate(concerns[1])}: Major concerns shift to ${concerns[0]}
    Litter training:
    ${this.getDate(litterbox[1])}: start ${litterbox[0]}
    Socialization:  
    ${this.getDate(socialization[1])}: ${socialization[0]}
    Vet:
     ${this.getDate(vet[1])}: ${vet[0]}

    Development:
    Weight:
    ${this.getDate(weight[1])}: ${this.name} should weigh at least ${weight[0]}g
    Eyes:
    ${this.getDate(eyes[1])}: Eyes will be ${eyes[0]}
    Ears: 
    ${this.getDate(ears[1])}: Ears will be ${ears[0]}
    Teeth: 
    ${this.getDate(teeth[1])}: ${this.name} will start to see ${teeth[0]}
    Mobility: 
    ${this.getDate(mobility[1])}: ${this.name} will be ${mobility[0]}`;
  };

  getFullDevelopment = () => {
    let age = this.age;
    let development = ``;

    while (age <= 42) {
      const weight = this.weight.filter(this.getAgeEntry(age)),
        eyes = this.milestones.eyes.filter(this.getAgeEntry(age)),
        ears = this.milestones.ears.filter(this.getAgeEntry(age)),
        teeth = this.milestones.teeth.filter(this.getAgeEntry(age)),
        mobility = this.milestones.mobility.filter(this.getAgeEntry(age)),
        concerns = this.concerns.filter(this.getAgeEntry(age)),
        foodtype = this.food.foodtype.filter(this.getAgeEntry(age)),
        capacity = this.food.capacity.filter(this.getAgeEntry(age)),
        frequency = this.food.frequency.filter(this.getAgeEntry(age)),
        temp = this.milestones.temperature.filter(this.getAgeEntry(age)),
        litterbox = this.milestones.litterbox.filter(this.getAgeEntry(age)),
        social = this.milestones.socialization.filter(this.getAgeEntry(age)),
        vet = this.milestones.vet.filter(this.getAgeEntry(age));

      let date = `${this.getDate(age - this.age)}
            Age: ${age} days (about ${Math.round(age / 7)} weeks)
            Weight: ${weight[0][0]}g
            Food capacity: ${capacity[0][0]}ml`;

      if (foodtype.length) date += "\nFood type: " + foodtype[0][0];
      if (frequency.length)
        date += "\nFeed: every " + frequency[0][0] + " hours";
      if (temp.length)
        date += "\nTemperature: " + temp[0][0] + "-" + temp[0][2] + "F";
      if (concerns.length) date += "\nConcerns: " + concerns[0][0];
      if (litterbox.length) date += "\nElimination: " + litterbox[0][0];
      if (social.length) date += "\nSocialization: " + social[0][0];
      if (vet.length) date += "\nVet:" + vet[0][0];
      if (eyes.length) date += "\nEyes: " + eyes[0][0];
      if (ears.length) date += "\nEars: " + ears[0][0];
      if (teeth.length) date += "\nTeeth: " + teeth[0][0];
      if (mobility.length) date += "\nMobility: " + mobility[0][0];

      development += "\n" + date + "\n";
      age++;
    }

    return development;
  };

  getAgeEntry(age) {
    return (entry) => entry[1] === age;
  }
}

//simulates getting a Date from a date picker in a browser
const bday = new Date("2021-09-01");
let kitkat = new Kitten(bday, "Kitkat", "M");
const container = document.getElementById("container");
const printed = `${kitkat.getKitten()}

                Needs:
                ${kitkat.getCurrentNeeds()}

                Current status:
                ${kitkat.getCurrentStatus()}
                
                Upcoming changes:
                ${kitkat.getNextChanges()}
                
                Growth chart:
                ${kitkat.getFullDevelopment()}`;
container.innerText = printed;
console.log(printed);

estimateAge = (kitten, min = 0, max = 999, weightCheck = false) => {
  if (max - min <= 7) {
    kitten.age = Math.floor((max + min) / 2);
    console.log(
      `${kitten.name} is approximately ${Math.floor(kitten.age / 7)} weeks old!`
    );
    return;
  } else if (kitten.milestone.weight.length > 0 && weightCheck == false) {
    let weight = kitten.milestone.weight[0][1]; // in grams
    if (weight > 2600) {
      // cat is probably at least 6 months
    } else {
      if (weight < 850)
        estimateAge(kitten, (weight - 150) / 14, (weight - 100) / 14, true);
    }
  } else {
    // adjust minimum
    if (kitten.milestone["litter-trained"]) {
      // at least a few weeks
    } else {
      // must be very young
    }
  }
};
