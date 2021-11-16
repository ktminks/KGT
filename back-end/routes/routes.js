import { Router } from "express";
import * as handle from "./routeHandlers.js";

// add additional parameter for dependencies
export default function routes(app) {
  const router = Router();

  // ------------------ API -----------------------------
  // Retrieve all Kittens
  router.get("/", handle.getAllKittens);

  // Retrieve a single Kitten with id
  router.get("*/id=:id?", handle.getOneKitten);

  // Retrieve a single Kitten with another condition
  router.get("*/search/name=:name?", handle.getOneKitten);

  // ------------------ Kittens page ---------------------
  // Create a new Kitten
  router.post("/kittens/add", handle.addKitten);

  // Update a Kitten with id
  router.put("/kittens/edit/:id", handle.editKitten);

  // Delete a Kitten with id
  router.delete("/kittens/delete/:id", handle.deleteKitten);

  // ------------------ Authentication  ------------------
  // Google login
  router.get("/auth/google/login", handle.googleLogin);

  router.get("/auth/google/callback", handle.googleLoginCallback, handle.redirect);

  // Logout (all)
  router.get("/auth/logout", handle.logout);

  // -------------------- Status fetch -------------------
  router.get("/loggedInStatus", handle.getLoginStatus);

  // ------------------ Router definition  ---------------
  app.use("*", handle.xsrfToken);
  app.use("*", handle.csrfErrors);
  app.use(/^(?!.*(auth)).*/, handle.getUser);
  app.use("/api", router);
}
