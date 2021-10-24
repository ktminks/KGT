import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    gid: { type: Number, required: true, index: { unique: true } },
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
  },
);

userSchema.method("toJSON", () => {
  const { __v, _id, ...object } = this.toObject();
  object.gid = _id;
  return object;
});

export default mongoose.model("User", userSchema);
