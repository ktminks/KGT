const dbConfig = require("../../config.json");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.kittens = require("./model.js")(mongoose);

module.exports = db;
