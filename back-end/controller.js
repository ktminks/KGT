/* eslint-disable no-underscore-dangle */
import { kittens as Kitten } from "./models/index.js";
import { sanitize } from "./_helpers/index.js";

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
  return "Something went wrong with the error handler.";
};

// Create and Save a new Kitten
export const create = async (req, res) => {
  // Create kitten
  let { name, sex } = req.body;
  const { birthdate } = req.body;
  name = name.toLowerCase();
  sex = sex.toLowerCase();

  const kitten = new Kitten({ name, sex, birthdate });
  console.log(kitten);
  // Save Kitten in the database
  try {
    kitten.save(kitten)
      .then(() => {
        res.send({ message: `${name} was created successfully!` });
      });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Retrieve all Kittens from the database.
export const findAll = async (req, res, next) => {
  // const { name } = req.query;
  // const regex = new RegExp(`${name}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // const condition = name ? { name: { $regex: regex, $options: "i" } } : {};

  Kitten.find({})
    .then((data) => {
      const dataAdjusted = data.map((k) => {
        const { name, sex, birthdate } = k;
        return {
          id: k._id, name, sex, birthdate,
        };
      });
      req.kittens = dataAdjusted;
      next();
    })
    .catch(() => res.status(500).send({
      message: "Some error occurred while retrieving kittens.",
    }));
};

// Find a single Kitten with an id
export const findOne = async (id, res) => {
  try {
    Kitten.findById(id)
      .then((data) => {
        if (data[0]) res.send(data[0]._id);
        else res.send({ message: `No kitten found with id ${id}` });
      });
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Kitten with id=${id}`,
    });
  }
};

export const findByName = async (name, res) => {
  try {
    Kitten.find({ name })
      .then((data) => {
        if (data[0]) {
          const {
            sex, birthdate, _id: id,
          } = data[0];
          res.send({
            name, sex, birthdate, id,
          });
        } else res.send({ message: `No kitten found with name ${name}` });
      });
  } catch (err) {
    res.status(404).send({ message: `No kitten found with name ${name}` });
  }
};

// Update a Kitten by the id in the request
export const update = async (req, res) => {
  if (!req.body) return res.status(400).send({ message: "Data to update can not be empty!" });
  const {
    name, sex, birthdate, id,
  } = req.body;
  const body = await sanitize({
    name, sex, birthdate, id,
  });

  try {
    await Kitten.findByIdAndUpdate(body.id, body, { useFindAndModify: false })
      .then((data) => res.send({ message: `${data.name} was updated successfully!` }));
  } catch (err) {
    res.status(404).send({ message: `Cannot update Kitten with id=${body.id}. Maybe Kitten was not found!` });
  }
  return "Something went terribly wrong while updating";
};

// Delete a Kitten with the specified id in the request
// const _delete = async (req, res) => {
const destroy = async (req, res) => {
  const { id } = req.params;

  const data = await Kitten.findByIdAndRemove(id);
  try {
    if (!data) res.status(404).send({ message: `Cannot delete Kitten with id=${id}. Maybe Kitten was not found!` });
    res.send({ message: `${data.name} was deleted successfully!` });
  } catch (err) {
    res.status(500).send({ message: `Could not delete Kitten with id=${id}` });
  }
};

export { destroy as delete };
