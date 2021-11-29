import { connect } from "../http.service";

describe("http.service", () => {
  it("should pass the XSRF token as a header", () => {
    expect.assertions(1);
    const mockConnect = jest.fn(connect);

    const XSRF_TOKEN = "12345";

    const local = mockConnect("/", XSRF_TOKEN);
    const { defaults: { headers } } = local;
    // console.log(headers);
    expect(headers["CSRF-Token"]).toBe(XSRF_TOKEN);
  });
});
