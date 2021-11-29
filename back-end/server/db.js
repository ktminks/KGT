import mongoose from "mongoose";
import { Kitten } from "../models/kitten.js";
import { User } from "../models/user.js";
import setSession from "./setSession.js";

export async function connectDB(app = null) {
  const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kittens";
  let message = "Haven't connected yet";

  const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  const connection = await mongoose.connect(URI, connectionOptions)
    .then(() => (message = "Connected to the database!"))
    .catch((err) => {
      message = `Cannot connect to the database! Error: ${err}`;
      process.exit();
    });

  if (connection && app) setSession(app, mongoose.connection.getClient());

  mongoose.Promise = global.Promise;
  return message;
}

export { Kitten, User };
export default connectDB;
