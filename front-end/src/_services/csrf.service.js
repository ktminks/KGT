import { getCookie } from "./cookie.service";

const getXsrfToken = () => getCookie("XSRF-TOKEN");

export default getXsrfToken;
