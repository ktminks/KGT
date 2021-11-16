const { MODE } = process.env;

export const baseURL = (MODE === "development")
  ? "http://localhost:4000/api"
  : "https://kgt.ktminks.com/api";

console.log(baseURL);
export const loginLink = `${baseURL}/auth/google/login`;
export const logoutLink = `${baseURL}/auth/logout`;
