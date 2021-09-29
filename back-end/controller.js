const db = require("./models");
const getGrowth = require("./_helpers/getGrowth");
const sanitize = require("./_helpers/sanitize");
const Kitten = db.kittens;

// Create and Save a new Kitten
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Kitten
  let kitten = new Kitten({
    name: req.body.name,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    age: req.body.age,
  });

  kitten = getGrowth(kitten);

  // Save Kitten in the database
  kitten
    .save(kitten)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Kitten.",
      });
    });
};

// Retrieve all Kittens from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Kitten.find(condition)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving kittens.",
      });
    });
};

// Find a single Kitten with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Kitten.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Kitten with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Kitten with id=" + id });
    });
};

// Update a Kitten by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Kitten.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Kitten with id=${id}. Maybe Kitten was not found!`,
        });
      } else {
        data = sanitize(data);
        res.send({ message: "Kitten was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Kitten with id=" + id,
      });
    });
};

// Delete a Kitten with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Kitten.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Kitten with id=${id}. Maybe Kitten was not found!`,
        });
      } else {
        res.send({
          message: `${data.name} was deleted successfully!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Kitten with id=" + id,
      });
    });
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
