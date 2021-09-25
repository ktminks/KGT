import axios from "axios";

const mode = process.env.MODE ? process.env.MODE : "DEVELOPMENT";
const URL =
  mode === "PRODUCTION"
    ? "https://kgt.ktminks.com/api"
    : "http://localhost:4000/api";

export default axios.create({
  baseURL: URL,
  headers: {
    "Content-type": "application/json",
  },
});
