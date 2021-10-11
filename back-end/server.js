import express, { static as stat } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import { MODE, PORT } from "./config.js";
import routes from "./routes.js";

const { urlencoded, json } = bodyParser;
const mode = process.env.MODE ? process.env.MODE : MODE || "DEVELOPMENT";
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
routes(app);

if (mode === "PRODUCTION") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/kgt.ktminks.com/privkey.pem",
    "utf8",
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/kgt.ktminks.com/cert.pem",
    "utf8",
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/kgt.ktminks.com/chain.pem",
    "utf8",
  );
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca,
  };
  // not sure if I need this next line
  app.use(stat("public"));
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen("8443", () => {
    console.log("listening on https://kgt.ktminks.com:8443");
  });
}

// start server
const port = process.env.PORT ? process.env.PORT || 80 : PORT;
app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});
