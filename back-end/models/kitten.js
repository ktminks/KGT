import mongoose from "mongoose";

const { Schema } = mongoose;

export const kittenSchema = new Schema(
  {
    name: { type: String, default: "kitten" },
    sex: { type: String, default: "n/a" },
    birthdate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

kittenSchema.method("toJSON", () => {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
export const Kitten = mongoose.model("Kitten", kittenSchema);
