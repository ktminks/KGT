import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-52-0-165-153.compute-1.amazonaws.com/",
  headers: {
    "Content-type": "application/json",
  },
});
