import passport from "passport";
import * as express from "express";
import * as kittens from "./controllers/kittenController.js";
import * as users from "./controllers/userController.js";

export default function routes(app) {
  const router = express.Router();
  const auth = express.Router();

  // ------------------ Utilities ------------------------
  const getByParams = (req, res) => {
    const { ...p } = req.params;
    // console.log("params", p.id, p.name);
    if (p.id) kittens.findOne(p.id, res);
    if (p.name) kittens.findByName(p.name, res);
  };

  // const redirectHome = (req, res) => res.redirect("http://localhost:4001/");
  const verifyCSRF = (req, res, next) => {
    console.log(req.body);
    console.log(req.cookies);
    // csrf_token_cookie = req.body.g_csrf_token;
    // if not csrf_token_cookie:
    //   webapp2.abort(400, 'No CSRF token in Cookie.')
    // csrf_token_body = self.request.get('g_csrf_token')
    // if not csrf_token_body:
    //   webapp2.abort(400, 'No CSRF token in post body.')
    // if csrf_token_cookie != csrf_token_body:
    //   webapp2.abort(400, 'Failed to verify double submit cookie.')
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
  auth.post("/googleLogin", verifyCSRF);
  // auth.post("/googleLogin", passport.authenticate("google", { assignProperty: "User" }));

  // auth.get("/googleLogin/callback", passport.authenticate("google"),
  //   // { assignProperty: "federatedUser", failureRedirect: "/login" }),
  //   users.getUserIfItExists);

  auth.get("/googleLogin",
    passport.authenticate("oauth2-jwt-bearer", { assignProperty: "User" }),
    users.getUserIfItExists);

  // ------------------ Router definition  ---------------
  app.use("/api", router);
  app.use("/auth", auth);
  // ------------------ Fallthrough ----------------------

  app.all("*", (req, res) => {
    res.redirect(404, "/api");
  });
}
