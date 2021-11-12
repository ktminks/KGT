import axios from "axios";

export const baseURL = "http://localhost:4000/api";

export default axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
