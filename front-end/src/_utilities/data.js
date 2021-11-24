const defaultKitten = {
  id: null,
  name: "",
  sex: "",
  birthdate: "",
  age: 0,
  milestones: {
    temperature: [[0, 0, 0]],
    eyes: [["", 0]],
    ears: [["", 0]],
    teeth: [["", 0]],
    litterTraining: [["", 0]],
    mobility: [["", 0]],
    socialization: [["", 0]],
    veterinary: [[0, 0]],
  },
  food: {
    foodtype: [["", 0]],
    capacity: [[0, 0]],
    frequency: [[0, 0]],
    weaning: [[false, 0]],
  },
  concerns: [["", 0]],
  weight: [[0, 0]],
};

const initKittens = [defaultKitten];

const defaultState = { initKittens, defaultKitten };

export default defaultState;
