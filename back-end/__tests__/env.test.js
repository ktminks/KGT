import keys from "../secrets.env.js";

describe("process.env", () => {
  it("holds the right values", () => {
    expect.assertions(7);
    expect((process.env.GOOGLE_CLIENT_ID)).toBe(keys.GOOGLE_CLIENT_ID);
    expect((process.env.GOOGLE_CLIENT_SECRET)).toBe(keys.GOOGLE_CLIENT_SECRET);
    expect((process.env.MONGODB_URI)).toBe(keys.MONGODB_URI);
    expect((process.env.HTTPS_PRIVKEY)).toBe(keys.HTTPS_PRIVKEY);
    expect((process.env.HTTPS_CERT)).toBe(keys.HTTPS_CERT);
    expect((process.env.HTTPS_CHAIN)).toBe(keys.HTTPS_CHAIN);
    expect((process.env.SESSION_SECRET)).toBe(keys.SESSION_SECRET);
  });
});
