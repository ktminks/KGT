import checkMode from "../checkMode.js";

describe("checkMode", () => {
  it("should return development", () => {
    expect.assertions(1);
    const mode = checkMode();
    console.log(mode);
    expect(mode).toBe("development");
  });
});
