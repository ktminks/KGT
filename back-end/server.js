import express, { urlencoded, json } from "express";
import cors from "cors";
import csurf from "csurf";
import { connectDB } from "./server/db.js";
import initPassport from "./auth/passport.js";
import routes from "./routes/routes.js";
import startServer from "./server/startServer.js";

export const app = express();
await connectDB(app).then((message) => {
  console.log(message);
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(csurf());
  initPassport(app);
  app.use(cors());
  routes(app);

  startServer(app);
}).catch((err) => console.error(err));

export default app;
