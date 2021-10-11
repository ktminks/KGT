const mongoose = require("mongoose");

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(process.env.MONGODB_URI, connectionOptions)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

mongoose.Promise = global.Promise;

module.exports = {
  // eslint-disable-next-line global-require
  Kitten: require("../models/kitten"),
};
