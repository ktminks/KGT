const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dbjs = require("../_helpers/db");

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.kittens = dbjs.Kitten;

module.exports = db;
