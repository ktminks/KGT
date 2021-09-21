import axios from "axios";
import config from "./config.json";
const url = config.baseURL + "/api";

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});
