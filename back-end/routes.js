module.exports = (app) => {
  const kittens = require("./controller");
  var router = require("express").Router();

  // Create a new Kitten
  router.post("/", kittens.create);

  // Retrieve all Kittens
  router.get("/", kittens.findAll);

  // Retrieve all published Kittens
  router.get("/published", kittens.findAllPublished);

  // Retrieve a single Kitten with id
  router.get("/:id", kittens.findOne);

  // Update a Kitten with id
  router.put("/:id", kittens.update);

  // Delete a Kitten with id
  router.delete("/:id", kittens.delete);

  // Create a new Kitten
  router.delete("/", kittens.deleteAll);

  app.use("/api/kittens", router);
};
