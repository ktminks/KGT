import { urlencoded, json } from "express";
import cors from "cors";
import csurf from "csurf";
import checkMode from "../_helpers/checkMode.js";
import routes from "../routes/routes.js";
import initPassport from "../auth/passport.js";
import setSession from "./setSession.js";
import startDevServer from "./startDevServer.js";
import startProdServer from "./startProdServer.js";

export default async function startServer(app) {
  const mode = checkMode();

  app.use(urlencoded({ extended: true }));
  app.use(json());
  setSession(app);
  app.use(csurf());
  initPassport(app);
  app.use(cors());
  routes(app);

  if (mode === "production") {
    const key = process.env.HTTPS_PRIVKEY;
    const cert = process.env.HTTPS_CERT;
    const ca = process.env.HTTPS_CHAIN;
    const credentials = { key, cert, ca };

    startProdServer(app, credentials);
  } else startDevServer(app);
}
