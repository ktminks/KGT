import * as app from "../server.js";
import connectDB from "../server/db.js";

describe("database", () => {
  it("connects successfully", async () => {
    expect.assertions(1);
    jest.mock("../server.js");
    const res = await connectDB(app);
    const { connection } = res;
    console.log(res);
    expect(connection).toBe("Connected to the database!");
    // it("disconnects successfully", async () => {
    //   expect.assertions(1);
    //   await res.close();
    //   expect(connection).toBeTruthy();
    // });
  });
});
