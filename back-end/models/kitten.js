import mongoose from "mongoose";

export const kittenSchema = new mongoose.Schema(
  {
    name: { type: String, default: "kitten" },
    sex: { type: String, default: "n/a" },
    birthdate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// eslint-disable-next-line func-names
kittenSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
export const Kitten = mongoose.model("Kitten", kittenSchema);
