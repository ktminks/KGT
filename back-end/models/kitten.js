const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kittenSchema = new Schema(
  {
    name: { type: String, default: "Kitten" },
    sex: { type: String, default: "NA" },
    birthdate: { type: Date, default: Date.now },
    age: { type: Number, default: 0 },
    milestones: {
      temperature: [],
      eyes: [],
      ears: [],
      teeth: [],
      litterbox: [],
      mobility: [],
      socialization: [],
      vet: [],
    },
    food: {
      foodtype: [],
      capacity: [],
      frequency: [],
      weaning: [],
    },
    concerns: [],
    weights: [],
  },
  { timestamps: true }
);

kittenSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Kitten", kittenSchema);
