import mongoose from "mongoose";
import Kitten from "../_helpers/db.js";

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.kittens = Kitten;

const { kittens } = db;

export { db, kittens };
