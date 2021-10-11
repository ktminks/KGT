import mongoose from "mongoose";
import Kitten from "../models/kitten.js";

const { connect } = mongoose;

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
connect(process.env.MONGODB_URI, connectionOptions)
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

mongoose.Promise = global.Promise;

export default Kitten;
