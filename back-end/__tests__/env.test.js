import * as secrets from "../secrets.env.js";

describe("process.env", () => {
  it("holds the right values", () => {
    expect.assertions(7);
    expect((process.env.GOOGLE_CLIENT_ID)).toBe(secrets.GOOGLE_CLIENT_ID);
    expect((process.env.GOOGLE_CLIENT_SECRET)).toBe(secrets.GOOGLE_CLIENT_SECRET);
    expect((process.env.MONGODB_URI)).toBe(secrets.MONGODB_URI);
    expect((process.env.HTTPS_PRIVKEY)).toBe(secrets.HTTPS_PRIVKEY);
    expect((process.env.HTTPS_CERT)).toBe(secrets.HTTPS_CERT);
    expect((process.env.HTTPS_CHAIN)).toBe(secrets.HTTPS_CHAIN);
    expect((process.env.SESSION_SECRET)).toBe(secrets.SESSION_SECRET);
  });
});
