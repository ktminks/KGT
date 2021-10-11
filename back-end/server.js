import express, { urlencoded, json, static as stat } from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import { MODE, PORT } from "./config.js";
import routes from "./routes.js";

const mode = process.env.MODE ? process.env.MODE : MODE || "DEVELOPMENT";
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
routes(app);
// app.use(stat("dist"));

if (mode === "PRODUCTION") {
  const privkey = "/etc/letsencrypt/live/kgt.ktminks.com/privkey.pem";
  const certificate = "/etc/letsencrypt/live/kgt.ktminks.com/cert.pem";
  const chain = "/etc/letsencrypt/live/kgt.ktminks.com/chain.pem";

  const key = fs.readFileSync(privkey, "utf8");
  const cert = fs.readFileSync(certificate, "utf8");
  const ca = fs.readFileSync(chain, "utf8");

  const credentials = { key, cert, ca };
  const msg = "HTTPS listening on https://kgt.ktminks.com:8443";

  // not sure if I need this next line
  app.use(stat("front-end"));
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen("8443", () => console.log(msg));
}

// start server
const port = process.env.PORT ? process.env.PORT || 80 : PORT;
const msg = `HTTP server listening on port ${port}`;
app.listen(port, () => console.log(msg));
