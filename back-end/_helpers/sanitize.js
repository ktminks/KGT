const db = require("../models");
const Kitten = db.kittens;

const sanitize = (data) => {
  try {
    new Kitten(data);
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = sanitize;
