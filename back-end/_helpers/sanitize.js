import { kittens } from "../models/index.js";

const Kitten = kittens;

const sanitize = (data) => {
  try {
    const kitten = new Kitten(data);
    return kitten ? { ...kitten.delete("_id") } : null;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default sanitize;
