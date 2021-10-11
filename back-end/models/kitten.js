const mongoose = require("mongoose");

const kittenSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Kitten" },
    sex: { type: String, default: "N/A" },
    birthdate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

kittenSchema.method("toJSON", () => {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Kitten", kittenSchema);
