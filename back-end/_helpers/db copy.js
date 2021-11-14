import mongoose from "mongoose";
import { Kitten } from "../models/kitten.js";
import User from "../models/user.js";

const { createConnection } = mongoose;
let connection;

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

try {
  connection = await createConnection(process.env.MONGODB_URI, connectionOptions);
  if (connection) console.log("Connected to the database!");
  else console.log("Cannot connect to the database!");
} catch (error) {
  console.log(error);
  process.exit();
}

mongoose.Promise = global.Promise;
// const client = connection.getClient();
export { Kitten, User };

// import mongoose from "mongoose";
// import { MongoClient } from "mongodb";
// import { Kitten } from "../models/kitten.js";
// import User from "../models/user.js";

// const mongoOptions = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };
// const mongooseOptions = {
//   useCreateIndex: true,
//   useFindAndModify: false,
// };
// const { connect } = MongoClient;
// const clientPromise = connect(process.env.MONGODB_URI, mongoOptions);

// try {
//   const client = await clientPromise;
//   console.log(clientPromise);
//   const { setClient } = mongoose.createConnection();

//   const connected = setClient(client);
//   if (connected) console.log("Connected to the database!");
//   else console.log("Cannot connect to the database!");
// } catch (error) {
//   console.log(error);
//   process.exit();
// }
// mongoose.Promise = global.Promise;
