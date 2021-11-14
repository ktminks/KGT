import express, { urlencoded, json } from "express";
import cors from "cors";
import csurf from "csurf";
import initPassport from "./auth/passport.js";
import routes from "./routes/routes.js";
import setSession from "./_helpers/setSession.js";
import startServer from "./_helpers/startServer.js";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
setSession(app);
app.use(csurf());
initPassport(app);
app.use(cors());
routes(app);

startServer(app);
