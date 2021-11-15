import express, { urlencoded, json } from "express";
import cors from "cors";
import csurf from "csurf";
import connectDB from "./_helpers/db.js";
import initPassport from "./auth/passport.js";
import routes from "./routes/routes.js";
import startServer from "./_helpers/startServer.js";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
await connectDB(app);
app.use(csurf());
initPassport(app);
app.use(cors());
routes(app);

startServer(app);
