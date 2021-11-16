import { static as exStatic } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export default function startDevServer(app) {
  const pathHere = dirname(fileURLToPath(import.meta.url));
  app.use(/^(?!\/api).*$/, exStatic(join(pathHere, "../public/dev")));

  const port = process.env.PORT ? process.env.PORT : 4000;
  const msg = `HTTP server listening on port ${port}`;
  app.listen(port, () => console.log(msg));
}
