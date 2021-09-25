import axios from "axios";

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : "DEVELOPMENT";
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
