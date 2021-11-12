import express, { urlencoded, json } from "express";
import session from "express-session";
import cors from "cors";
import csurf from "csurf";
import initPassport from "./auth/passport.js";
import routes from "./routes/routes.js";
import startServer from "./_helpers/startServer.js";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(session({
  secret: process.env.KGT_SESSION_SECRET || "catballs",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: false,
    secure: "auto",
  },
  resave: true,
  saveUninitialized: true,
  // store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(csurf());
initPassport(app);
app.use(cors());
routes(app);

startServer(app);
