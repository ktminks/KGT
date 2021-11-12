import axios from "axios";

const baseURL = "https://kgt.ktminks.com/api";

export default axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
