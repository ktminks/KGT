import https from "https";

export default function startProdServer(app, credentials) {
  const httpsServer = https.createServer(credentials, app);
  const msg = "HTTPS listening on https://kgt.ktminks.com:8443";
  httpsServer.listen("8443", () => console.log(msg));
}
