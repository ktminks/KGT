import { baseURL } from "./address.service";

console.log(baseURL);
export const loginLink = `${baseURL}/auth/google/login`;
export const logoutLink = `${baseURL}/auth/logout`;
