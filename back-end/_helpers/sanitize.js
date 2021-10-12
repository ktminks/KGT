/* eslint-disable dot-notation */
import { kittens } from "../models/index.js";

const Kitten = kittens;

const sanitize = async (data) => {
  try {
    const {
      name, sex, birthdate, id,
    } = data;
    const details = {
      name: name.toLowerCase(),
      sex: sex.toLowerCase(),
      birthdate,
    };
    const kitten = new Kitten(details);
    return kitten && id.length <= 24 ? { ...details, id } : null;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default sanitize;
