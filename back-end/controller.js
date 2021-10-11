import { kittens as Kitten } from "./models/index.js";
import { getKitten, sanitize } from "./_helpers/index.js";

const getData = (data) => data.map((k) => getKitten(k.birthdate, k.name, k.sex, k.id));

// Create and Save a new Kitten
export async function create(req, res) {
  // Create kitten
  const { name, sex, birthdate } = req.body;
  const kitten = new Kitten({ name, sex, birthdate });
  const kittenData = getKitten(birthdate, name, sex, kitten.id);
  // Save Kitten in the database
  kitten
    .save(kitten)
    .then(() => {
      res.send(kittenData);
    })
    .catch(() => res.status(500).send({
      message: "Some error occurred while creating the Kitten.",
    }));
}

// Retrieve all Kittens from the database.
export async function findAll(req, res) {
  const { name } = req.query;
  const regex = new RegExp(`${name}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const condition = name ? { name: { $regex: regex, $options: "i" } } : {};

  Kitten.find(condition)
    .then((data) => {
      res.send(getData(data));
    })
    .catch(() => {
      res.status(500).send({
        message: "Some error occurred while retrieving kittens.",
      });
    });
}

// Find a single Kitten with an id
export async function findOne(req, res) {
  const { id } = req.params;

  Kitten.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: `Not found Kitten with id ${id}` });
      res.send(data);
    })
    .catch(() => res.status(500).send({
      message: `Error retrieving Kitten with id=${id}`,
    }));
}

// Update a Kitten by the id in the request
export async function update(req, res) {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });
  }

  const { id } = req.params;
  const body = sanitize(req.body);

  Kitten.findByIdAndUpdate(id, body, { useFindAndModify: false })
    .then((data) => {
      if (!data) res.status(404).send({ message: `Cannot update Kitten with id=${id}. Maybe Kitten was not found!` });
      res.send({ message: `${data.name} was updated successfully.` });
    })
    .catch(() => res.status(500).send({ message: `Error updating Kitten with id=${id}` }));
}

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
