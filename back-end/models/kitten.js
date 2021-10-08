const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kittenSchema = new Schema(
  {
    name: { type: String, default: "Kitten" },
    sex: { type: String, default: "N/A" },
    birthdate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

kittenSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Kitten", kittenSchema);
