/* eslint-disable no-underscore-dangle */
import sanitize from "../_helpers/sanitize.js";
import getKitten from "../_helpers/getKitten.js";
import errorHandler from "../_helpers/errorHandler.js";

// array of guest users
// const guests = [];

const getData = (data) => data.map((k) => getKitten(k));

const getKittens = (req) => {
  const { user } = req;
  if (user) {
    const { kittens, alteredKittenIndex } = user;
    return { kittens, alteredKittenIndex };
  }
  return null;
};

// Create a new kitten
export const create = async (req, res, next) => {
  try {
    // Create kitten
    const { birthdate } = req.body;
    let { name, sex } = req.body;
    name = name.toLowerCase();
    sex = sex.toLowerCase();

    // Add new kitten to user cookie
    const { kittens } = getKittens(req);
    if (kittens) {
      kittens.push({ name, sex, birthdate });
      next();
    }
  } catch (err) { errorHandler(err, req, res, next); }
};

// Retrieve all kittens from the user
export const findAll = async (req, res, next) => {
  try {
    const { kittens } = getKittens(req) || {};
    if (kittens) res.send(getData(kittens));
    else res.send({ message: "No kittens found in user cookie." });
  } catch (err) { errorHandler(err, req, res, next); }
};

export const findByIndex = async (req, res, next) => {
  try {
    const { kittens, alteredKittenIndex } = getKittens(req);
    if (kittens && alteredKittenIndex) {
      const kitten = getKitten(kittens[alteredKittenIndex]);
      res.send({ ...kitten, message: `${kitten.name} was created/modified successfully!` });
    } else res.send({ message: "No kitten found" });
  } catch (err) { errorHandler(err, req, res, next); }
};

// Find a single Kitten with an id
export const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const { kittens } = getKittens(req);
      const found = kittens.find((k) => k.id === id);
      if (found) res.send(found.id);
      else res.send({ message: `No kitten found with id ${id}` });
    } else res.send({ message: "No id found in parameters" });
  } catch (err) { errorHandler(err, req, res, next); }
};

export const findByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    if (name) {
      const { kittens } = getKittens(req);
      const found = kittens.find((k) => k.name === name);
      if (found) res.send(found.id);
      else res.send({ message: `No kitten found with name ${name}` });
    } else res.send({ message: "No name found in parameters" });
  } catch (err) { errorHandler(err, req, res, next); }
};

// Update a Kitten by the id in the request
export const update = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send({ message: "No data to update!" });

    // sanitize data from update form
    const {
      name, sex, birthdate, id,
    } = req.body;
    const data = await sanitize({
      name, sex, birthdate, id,
    });

    const { kittens } = getKittens(req);

    // find kitten to be updated
    const index = kittens ? kittens.findIndex((k) => k.id === id) : null;
    if (index) {
      const kitten = kittens[index];

      // update kitten
      Object.keys(data).map((key) => (kitten[key] = data[key]));

      // pass index to database update
      req.user.alteredKittenIndex = index;
      next();
    } else res.send({ message: `No kitten found with id ${data.id}` });
  } catch (err) { errorHandler(err, req, res, next); }
};

// Delete a Kitten with the specified id in the request
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      const { kittens } = getKittens(req);
      const index = kittens.findIndex((k) => k.id === id);
      if (index) {
        kittens.splice(index, 1);
        next();
      } else res.send({ message: `No kitten found with id ${id} in user cookie.` });
    } else res.status(404).send({ message: `Could not find Kitten with id=${id} to delete.` });
  } catch (err) { errorHandler(err, req, res, next); }
};
export { remove as delete };
