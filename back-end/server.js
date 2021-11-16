import express from "express";
import startServer from "./server/startServer.js";
import getSecrets from "./server/getSecrets.js";
import printSecrets from "./server/printSecrets.js";

const app = express();
try {
  getSecrets();
  printSecrets(); // debugging
  startServer(app);
} catch (err) { console.error(err); }
