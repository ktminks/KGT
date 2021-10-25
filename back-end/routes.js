import passport from "passport";
// import { createProxyMiddleware } from "http-proxy-middleware";
import * as express from "express";
import * as kittens from "./controllers/kittenController.js";
import { googleLogin } from "./controllers/userController.js";

export default function routes(app) {
  const router = express.Router();
  // const options = {
  //   // context: ["/api/forward#", "/api/forward"],
  //   cookieDomainRewrite: {
  //     "http://localhost:4000": "http://localhost:4001",
  //   },
  //   target: "https://kgt.ktminks.com",
  //   ws: true,
  //   changeOrigin: true,
  //   pathRewrite: {
  //     "^/forward": "/",
  //     "^/forward#": "/",
  //   },
  //   router: {
  //     "localhost:4000": "http://localhost:4001",
  //     "localhost:4000/forward": "http://localhost:4001",
  //     "localhost:4000/forward#": "http://localhost:4001",
  //   },
  // };
  // const proxy = createProxyMiddleware(options);
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

  router.get("/auth/google/logout",
    (req) => req.logout(),
    (req, res) => res.redirect("/"));

  router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleLogin,
    (req, res) => res.redirect("/success"));

  // ------------------ Router definition  ---------------
  // app.use("/forward", proxy);
  app.use("/api", router);
  // ------------------ Fallthrough ----------------------

  app.all("*", (req, res) => {
    res.redirect("/forward");
  });
}
