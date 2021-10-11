import { kittens } from "../models/index.js";

const Kitten = kittens;

const sanitize = (data) => {
  try {
    if (new Kitten(data)) return data;
    console.error("Data doesn't match schema");
    return "";
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default sanitize;
