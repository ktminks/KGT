import axios from "axios";

export default axios.create({
  baseURL: "https://kgt.ktminks.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
