import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, index: { unique: true } },
  },
);

export default mongoose.model("User", userSchema);
