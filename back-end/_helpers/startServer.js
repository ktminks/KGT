import { static as exStatic } from "express";
import https from "https";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import checkMode from "./checkMode.js";

const pathHere = dirname(fileURLToPath(import.meta.url));

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

    // app.use(/^(?!\/api).*$/, exStatic(join(pathHere, "../public/prod")));

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen("8443", () => console.log(msg));
  }

  // otherwise, start http server
  app.use(/^(?!\/api).*$/, exStatic(join(pathHere, "../public/dev")));

  const port = process.env.PORT ? process.env.PORT : 4000;
  const msg = `HTTP server listening on port ${port}`;
  app.listen(port, () => console.log(msg));
}
