import passport from "passport";
import * as express from "express";
import * as kittens from "./controllers/kittenController.js";
import { googleLogin } from "./controllers/userController.js";

export default function routes(app) {
  const router = express.Router();

  // ------------------ Utilities ------------------------
  const getByParams = (req, res) => {
    const { ...p } = req.params;
    // console.log("params", p.id, p.name);
    if (p.id) kittens.findOne(p.id, res);
    if (p.name) kittens.findByName(p.name, res);
  };

  // ------------------ API -----------------------------
  // Retrieve all Kittens
  router.get("/", kittens.findAll);

  // Retrieve a single Kitten with id
  router.get("*/id=:id?", getByParams);

  // Retrieve a single Kitten with another condition
  router.get("*/search/name=:name?", getByParams);

  // ------------------ Kittens page ---------------------
  // Create a new Kitten
  router.post("/kittens/add", kittens.create);

  // Update a Kitten with id
  router.put("/kittens/edit/:id", kittens.update);

  // Delete a Kitten with id
  router.delete("/kittens/delete/:id", kittens.delete);

  // ------------------ Authentication router ------------
  // Login
  router.get("/auth/google/login",
    passport.authenticate("google", { session: true, scope: ["profile", "email"] }));

  router.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleLogin,
    (req, res) => res.redirect("/success"));

  router.get("/loggedInStatus", (req, res) => {
    let name;
    const loggedIn = req.isAuthenticated();
    if (loggedIn) ({ name: { givenName: name } } = req.user);
    res.send(loggedIn ? name : false);
  });

  // ------------------ Router definition  ---------------
  app.use("/api", router);
  // ------------------ Fallthrough ----------------------

  // app.get("/", (req, res) => {
  //   res.sendFile("./static/index.html");
  // });

  // app.all("*", (req, res) => {
  //   res.redirect("/");
  // });
}
