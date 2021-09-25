const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config.json");
const mode = process.env.MODE ? process.env.MODE : config.MODE || "DEVELOPMENT";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
require("./routes")(app);

if (mode === "PRODUCTION") {
  const https = require("https");
  const fs = require("fs");
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/kgt.ktminks.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/kgt.ktminks.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/kgt.ktminks.com/chain.pem",
    "utf8"
  );
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
  // not sure if I need this next line
  app.use(express.static("public"));
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen("8443", () => {
    console.log("listening on https://kgt.ktminks.com:8443");
  });
}

// start server
const port = process.env.PORT ? process.env.PORT || 80 : config.PORT;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});
