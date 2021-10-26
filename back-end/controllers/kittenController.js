/* eslint-disable no-underscore-dangle */
import { kittens as Kitten, users as User } from "../models/index.js";
import { getKitten, sanitize } from "../_helpers/index.js";
import { findUserById } from "./userController.js";

const getData = (data) => data.map((k) => getKitten(k.name, k.sex, k.birthdate, k.id));

const getUser = async (req) => {
  if (req.session.passport) {
    const { user } = req.session.passport;
    const { id: gid } = user;
    return findUserById(gid);
  }
  return findUserById(0);
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  res.status(err.status || 500);
  res.json({ message: err.message, ...err });

  return "Something went wrong with the error handler.";
};

// Create and Save a new Kitten
export const create = async (req, res, next) => {
  // Create kitten
  const { birthdate } = req.body;
  let { name, sex } = req.body;
  name = name.toLowerCase();
  sex = sex.toLowerCase();

  // Save Kitten in the database
  try {
    const user = await getUser(req);

    if (user) {
      const indexOfNewKitten = (user.kittens.push({ name, sex, birthdate })) - 1;
      const saved = await user.save(user);
      if (saved) {
        const { id } = user.kittens[indexOfNewKitten];
        const kittenData = getKitten(name, sex, birthdate, id);
        res.send({ ...kittenData, message: `${name} was created successfully!` });
      } else {
        res.send({ message: "Please login to create your own kittens!" });
      }
    }
  } catch (err) {
    errorHandler(err, req, res, next);
  }
};

// Retrieve all Kittens from the database.
export const findAll = async (req, res, next) => {
  // console.dir(req.session);
  // const { name } = req.query;
  // escape characters for security purposes
  // const regex = new RegExp(`${name}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // const condition = name ? { name: { $regex: regex, $options: "i" } } : {};

  try {
    const user = await getUser(req);

    console.log("user:");
    console.log(user);
    res.send(getData(user.kittens));
  } catch (err) { errorHandler(err, req, res, next); }
};

// Find a single Kitten with an id
export const findOne = async (id, res) => {
  try {
    const found = await Kitten.findById(id);
    if (found && found[0]) res.send(found[0]._id);
    else res.send({ message: `No kitten found with id ${id}` });
  } catch (err) { errorHandler(err, id, res); }
};

export const findByName = async (name, res) => {
  try {
    const found = await Kitten.find({ name });
    if (found) res.send(found[0]._id);
    else res.send({ message: `No kitten found with name ${name}` });
  } catch (err) { errorHandler(err, name, res); }
};

// Update a Kitten by the id in the request
export const update = async (req, res) => {
  if (!req.body) return res.status(400).send({ message: "No data to update!" });

  const {
    name, sex, birthdate, id,
  } = req.body;
  const body = await sanitize({
    name, sex, birthdate, id,
  });

  try {
    const found = await Kitten.findByIdAndUpdate(body.id, body, { useFindAndModify: false });
    if (found) res.send({ message: `${found.name} was updated successfully!` });
    else res.send({ message: `No kitten found with id ${body.id}` });
  } catch (err) { errorHandler(err, req, res); }

  return "Something went terribly wrong while updating";
};

// Delete a Kitten with the specified id in the request
const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Kitten.findByIdAndRemove(id);
    if (data) res.send({ message: `${data.name} was deleted successfully!` });
    else res.status(404).send({ message: `Could not find Kitten with id=${id} to delete.` });
  } catch (err) { errorHandler(err, req, res); }
};
export { remove as delete };
