import express, { urlencoded, json } from "express";
import session from "express-session";
import cors from "cors";
import initPassport from "./auth/passport.js";
import routes from "./routes.js";
import startServer from "./_helpers/startServer.js";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(session({
  secret: "secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: false,
  },
  resave: true,
  saveUninitialized: false,
}));
initPassport(app);
app.use(cors());
routes(app);

startServer(app);
