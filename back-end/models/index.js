import mongoose from "mongoose";
import { Kitten, User } from "../server/db.js";

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.kittens = Kitten;
db.users = User;

const { kittens, users } = db;

export { db, kittens, users };
