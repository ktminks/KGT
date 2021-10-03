module.exports = (app) => {
  const kittens = require("./controller");
  const router = require("express").Router();

  // Create a new Kitten
  router.post("/", kittens.create);

  // Retrieve all Kittens
  router.get("/", kittens.findAll);

  // Retrieve a single Kitten with id
  router.get("/:id", kittens.findOne);

  // Update a Kitten with id
  router.put("/edit/:id", kittens.update);

  // Delete a Kitten with id
  router.delete("/delete/:id", kittens.delete);

  app.use("/api/kittens", router);
};
