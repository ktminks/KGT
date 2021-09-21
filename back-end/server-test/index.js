var express = require("express");
var app = require("../server");
const https = require("https");
const fs = require("fs");
const privateKey = fs.readFileSync("../nginx/privkey.pem", "utf8");
const certificate = fs.readFileSync("../nginx/cert.pem", "utf8");
const ca = fs.readFileSync("../nginx/chain.pem", "utf8");
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};
app.use(express.static("public"));
const httpsServer = https.createServer(credentials, app);
httpsServer.listen("8443", () => {
  console.log("listening on https://yourdomain.com:8443");
});
