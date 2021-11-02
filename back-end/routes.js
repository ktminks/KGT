import passport from "passport";
import * as express from "express";
import * as kittens from "./controllers/kittenController.js";
import * as users from "./controllers/userController.js";
import * as db from "./controllers/dbController.js";

// add additional parameter for dependencies
export default function routes(app) {
  const router = express.Router();

  // ------------------ API -----------------------------
  router.all("*", db.getUser);

  // Retrieve all Kittens
  router.get("/", kittens.findAll);

  // Retrieve a single Kitten with id
  router.get("*/id=:id?", kittens.findById);

  // Retrieve a single Kitten with another condition
  router.get("*/search/name=:name?", kittens.findByName);

  // ------------------ Kittens page ---------------------
  // Create a new Kitten
  router.post("/kittens/add", kittens.create, db.createKitten, kittens.findByIndex);

  // Update a Kitten with id
  router.put("/kittens/edit/:id", kittens.update, db.updateKitten, kittens.findByIndex);

  // Delete a Kitten with id
  router.delete("/kittens/delete/:id", kittens.delete, db.deleteKitten, kittens.findAll);

  // ------------------ Authentication router ------------
  // Google login
  router.get("/auth/google/login",
    passport.authenticate("google", { session: true, scope: ["profile", "email"] }));

  router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    db.checkDBForUser,
    users.googleLogin, // might not be necessary
    (req, res) => res.redirect("/success"));

  // Logout
  router.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // -------------------- Status fetch -------------------
  router.get("/loggedInStatus", (req, res) => {
    let name;
    const loggedIn = req.isAuthenticated();
    if (loggedIn) ({ name: { givenName: name } } = req.user);
    res.send(loggedIn ? name : false);
  });

  // ------------------ Router definition  ---------------
  app.use("/api", router);

  // ------------------ Fallthrough ----------------------

  // app.use("^(?!/api).*$", (req, res) => {
  //   res.redirect("/");
  // });
}
