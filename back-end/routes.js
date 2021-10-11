import * as express from "express";
import * as kittens from "./controller.js";

export default function routes(app) {
  const router = express.Router();
  // Retrieve all Kittens
  router.get("/growth/", kittens.findAll);

  // Retrieve a single Kitten with id
  router.get("/growth/:id", kittens.findOne);

  // Retrieve all Kittens
  router.get("/kittens/", kittens.findAll);

  // Retrieve a single Kitten with id
  router.get("/kittens/:id", kittens.findOne);

  router.get("/add", (req, res) => {
    res.redirect("/kittens/add");
  });

  // Create a new Kitten
  router.post("/kittens/", kittens.create);

  // Update a Kitten with id
  router.put("/kittens/edit/:id", kittens.update);

  // Delete a Kitten with id
  router.delete("/kittens/delete/:id", kittens.delete);

  app.use("/api", router);
}
