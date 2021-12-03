import checkMode from "../checkMode.js";

describe("checkMode", () => {
  it("should return development", () => {
    expect.assertions(1);
    const mode = checkMode();
    expect(mode).toBe("development");
  });
});
