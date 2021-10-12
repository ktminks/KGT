/* eslint-disable no-underscore-dangle */
import { kittens as Kitten } from "./models/index.js";
import { getKitten, sanitize } from "./_helpers/index.js";

const getData = (data) => data.map((k) => getKitten(k.name, k.sex, k.birthdate, k.id));

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
  let { name, sex, birthdate } = req.body;
  name = name.toLowerCase();
  sex = sex.toLowerCase();

  const kitten = new Kitten({ name, sex, birthdate });
  // Save Kitten in the database
  try {
    kitten.save(kitten)
      .then(() => {
        const kittenData = getKitten(name, sex, birthdate, kitten.id);
        res.send({ ...kittenData, message: `${name} was created successfully!` });
      });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Retrieve all Kittens from the database.
export const findAll = async (req, res) => {
  const { name } = req.query;
  const regex = new RegExp(`${name}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const condition = name ? { name: { $regex: regex, $options: "i" } } : {};

  Kitten.find(condition)
    .then((data) => res.send(getData(data)))
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
        if (data[0]) res.send(data[0]._id);
        else res.send({ message: `No kitten found with name ${name}` });
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

// ALTER THESE FUNCTIONS VVV

// Delete all Kittens from the database.
// exports.deleteAll = (req, res) => {
//   Kitten.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Kittens were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all kittens.",
//       });
//     });
// };

// Find all published Kittens
// exports.findAllPublished = (req, res) => {
//   Kitten.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving kittens.",
//       });
//     });
// };
