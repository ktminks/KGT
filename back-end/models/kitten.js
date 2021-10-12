import mongoose from "mongoose";

const { Schema } = mongoose;

const kittenSchema = new Schema(
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

export default mongoose.model("Kitten", kittenSchema);
