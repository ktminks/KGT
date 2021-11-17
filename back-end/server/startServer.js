import { static as exStatic } from "express";
import https from "https";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import checkMode from "../_helpers/checkMode.js";

const pathHere = dirname(fileURLToPath(import.meta.url));

export default function startServer(app) {
  const mode = checkMode();
  // const mode = "production";

  if (mode === "production") {
    const key = process.env.HTTPS_PRIVKEY;
    const cert = process.env.HTTPS_CERT;
    const ca = process.env.HTTPS_CHAIN;
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
