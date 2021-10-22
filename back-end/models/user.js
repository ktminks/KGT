import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: { type: Number, required: true },
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
  },
);

export default mongoose.model("User", userSchema);
