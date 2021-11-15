import mongoose from "mongoose";
import { Kitten } from "../models/kitten.js";
import User from "../models/user.js";
import setSession from "./setSession.js";

export default async function connectDB(app) {
  const { connect } = mongoose;

  const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await connect(process.env.MONGODB_URI, connectionOptions)
    .then(() => console.log("Connected to the database!"))
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

  const client = mongoose.connection.getClient();
  setSession(app, client);
  mongoose.Promise = global.Promise;
}

export { Kitten, User };
