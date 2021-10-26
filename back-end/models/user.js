import mongoose from "mongoose";
import { kittenSchema } from "./kitten.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    gid: { type: Number, required: true, index: { unique: true } },
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    kittens: [kittenSchema],
  },
);

userSchema.method("toJSON", () => {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model("User", userSchema);
