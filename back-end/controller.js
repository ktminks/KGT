const db = require("./models");
const { getKitten, sanitize } = require("./_helpers");
const Kitten = db.kittens;

const getData = (data) => {
  let kittenData = data.map(obj => {
    return { id: obj._doc._id, ...obj._doc, ...getKitten(obj.birthdate) };
  });
  return kittenData;
}

// Create and Save a new Kitten
exports.create = async (req, res) => {
  // Create kitten
  const { name, sex, birthdate } = req.body;
  let kitten = new Kitten({ name, sex, birthdate });

  // Save Kitten in the database
  kitten
    .save(kitten)
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>
      res.status(500).send({
        message: "Some error occurred while creating the Kitten.",
      })
    );
};

// Retrieve all Kittens from the database.
exports.findAll = async (req, res) => {
  const name = req.query.name;
  const regex = new RegExp(`${name}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const condition = name ? { name: { $regex: regex, $options: "i" } } : {};

  Kitten.find(condition)
    .then((data) => {
      res.send(getData(data))
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while retrieving kittens.",
      })
    });
};

// Find a single Kitten with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  Kitten.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Kitten with id " + id });
      else res.send(data);
    })
    .catch((err) =>
      res.status(500).send({
        message: "Error retrieving Kitten with id=" + id,
      })
    );
};

// Update a Kitten by the id in the request
exports.update = async (req, res) => {
  if (!req.body)
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });

  const id = req.params.id;
  const body = sanitize(req.body);

  Kitten.findByIdAndUpdate(id, body, { useFindAndModify: false })
    .then((data) => {
      data
        ? res.send({ message: `${data.name} was updated successfully.` })
        : res.status(404).send({
          message: `Cannot update Kitten with id=${id}. Maybe Kitten was not found!`,
        });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error updating Kitten with id=" + id })
    );
};

// Delete a Kitten with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  const data = await Kitten.findByIdAndRemove(id);
  try {
    data
      ? res.send({ message: `${data.name} was deleted successfully!` })
      : res.status(404).send({
        message: `Cannot delete Kitten with id=${id}. Maybe Kitten was not found!`,
      });
  } catch (err) {
    res.status(500).send({ message: "Could not delete Kitten with id=" + id });
  }
};

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
