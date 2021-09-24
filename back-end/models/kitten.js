const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kittenSchema = new Schema(
  {
    name: { type: String, default: "Kitten" },
    sex: { type: String, default: "NA" },
    birthdate: { type: Date, default: Date.now },
    age: { type: Number, default: 0 },
    // milestones: {
    //   temperatures: [{ temperature: Number, age: Number }],
    //   eyes: [{ phase: String, age: Number }],
    //   ears: [{ phase: String, age: Number }],
    //   teeth: [{ phase: String, age: Number }],
    //   litterbox: [{ phase: String, age: Number }],
    //   mobility: [{ phase: String, age: Number }],
    //   socialization: [{ phase: String, age: Number }],
    //   vet: [{ visit: Number, age: Number }],
    // },
    // food: {
    //   foodtype: [{ type: String, age: Number }],
    //   capacities: [{ capacity: Number, age: Number }],
    //   frequencies: [{ frequency: Number, age: Number }],
    //   weaning: [{ wean: Boolean, age: Number }],
    // },
    // concerns: [{ concern: String, age: Number }],
    // weights: [{ weight: Number, age: Number }],
  },
  { timestamps: true }
);

kittenSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Kitten", kittenSchema);
