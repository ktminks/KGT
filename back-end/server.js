import express, { urlencoded, json } from "express";
import session from "express-session";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import https from "https";
import fs from "fs";
import initPassport from "./auth/passport.js";
import { MODE, PORT } from "./config.js";
import routes from "./routes.js";

// eslint-disable-next-line no-underscore-dangle
const pathHere = dirname(fileURLToPath(import.meta.url));
const mode = process.env.MODE ? process.env.MODE : MODE || "DEVELOPMENT";
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

app.use(/^(?!\/api).*$/, express.static(join(pathHere, "public")));

if (mode === "PRODUCTION") {
  const privkey = "/etc/letsencrypt/live/kgt.ktminks.com/privkey.pem";
  const certificate = "/etc/letsencrypt/live/kgt.ktminks.com/cert.pem";
  const chain = "/etc/letsencrypt/live/kgt.ktminks.com/chain.pem";

  const key = fs.readFileSync(privkey, "utf8");
  const cert = fs.readFileSync(certificate, "utf8");
  const ca = fs.readFileSync(chain, "utf8");

  const credentials = { key, cert, ca };
  const msg = "HTTPS listening on https://kgt.ktminks.com:8443";

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen("8443", () => console.log(msg));
}

// start server
const port = process.env.PORT ? process.env.PORT || 80 : PORT;
const msg = `HTTP server listening on port ${port}`;
app.listen(port, () => console.log(msg));
