import axios from "axios";
import getXsrfToken from "./csrf.service";

export default function connect(baseURL) {
  const XSRF_TOKEN = getXsrfToken();

  return axios.create({
    baseURL,
    headers: {
      "CSRF-Token": XSRF_TOKEN,
      "Content-type": "application/json",
    },
  });
}
