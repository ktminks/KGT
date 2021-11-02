import https from "https";
import fs from "fs";
import checkMode from "./checkMode.js";

export default function startServer(app) {
  const mode = checkMode();

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

  // otherwise, start http server
  const port = process.env.PORT ? process.env.PORT : 4000;
  const msg = `HTTP server listening on port ${port}`;
  app.listen(port, () => console.log(msg));
}
