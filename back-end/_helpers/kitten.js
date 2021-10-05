class Kitten {
  generateData = function () {
    let age = 1;
    while (age < 86) {
      this.food.capacity.push([2 + Math.floor((age * 4) / 7), age]);
      this.weight.push([Math.floor(50 + (100 / 7) * age), age]);
      age++;
    }
  };
  constructor() {
    (this.milestones = {
      temperature: [
        [85, 2, 90],
        [80, 7, 85],
        [75, 14, 80],
        [70, 21, 75],
      ],
      eyes: [
        ["closed", 2],
        ["partially open", 7],
        ["open, blue", 14],
      ],
      ears: [
        ["closed", 2],
        ["partially open", 7],
        ["open, upright", 21],
      ],
      teeth: [
        ["none", 2],
        ["incisors", 21],
        ["canines", 28],
        ["premolars", 35],
        ["all milk teeth", 42],
      ],
      litterbox: [
        ["stimulate", 2],
        ["training", 14],
        ["clay litter only", 28],
      ],
      mobility: [
        ["sleeping", 2],
        ["crawling", 7],
        ["wobbly", 14],
        ["walking", 28],
        ["playful", 35],
        ["running", 42],
        ["coordinated", 49],
      ],
      socialization: [
        ["minimal handling", 2],
        ["frequent handling", 14],
        ["acclimation period", 21],
      ],
      vet: [
        ["First visit", 42],
        ["Second visit", 63],
        ["Third visit", 84],
      ],
    }),
      (this.food = {
        foodtype: [
          ["milk", 2],
          ["milk / kitten food", 35],
          ["kitten food", 42],
        ],
        capacity: [],
        frequency: [
          [2, 2],
          [3, 7],
          [4, 14],
          [5, 21],
          [6, 28],
          [8, 84],
        ],
        weaning: [
          [false, 2],
          [true, 35],
          [false, 42],
        ],
      }),
      (this.concerns = [
        ["hypothermia, lethargy, diarrhea, vomiting", 2],
        ["diarrhea, vomiting, developmental delays", 28],
      ]),
      (this.weight = []),
      this.generateData();
  }
}

module.exports = Kitten;
