const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("../config.json");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
require("./routes")(app);

// start server
const port = process.env.PORT ? process.env.PORT || 80 : config.PORT;
export default app.listen(port, function () {
  console.log("Server listening on port " + port);
});
