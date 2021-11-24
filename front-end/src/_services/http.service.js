import axios from "axios";
import getXsrfToken from "./csrf.service";

// eslint-disable-next-line import/prefer-default-export
export const connect = (baseURL, token) => {
  const XSRF_TOKEN = token || getXsrfToken();
  return axios.create({
    baseURL,
    headers: {
      "CSRF-Token": XSRF_TOKEN,
      "Content-type": "application/json",
    },
  });
};

export default connect;
