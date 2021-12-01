// import React from "react";
// import {
//   render, screen, waitFor, fireEvent,
// } from "@testing-library/react";

import { waitFor } from "@testing-library/react";
import * as local from "../localStorage.service";
import mockKittens from "../../mocks/kittens";

const mockState = {
  kittens: mockKittens,
  currentIndex: 0,
};

describe("localStorage service", () => {
  it("should store the id of currently viewed kitten", async () => {
    expect.hasAssertions();
    const { id } = mockState.kittens[mockState.currentIndex];
    const localIsSet = local.setLocalStorage(id);
    expect(localIsSet).toBeTruthy();

    await waitFor(() => {
      const storage = local.getLocalStorage();
      expect(storage).toStrictEqual(`${id}`);
    });
  });
  it("should return the previous state", async () => {
    expect.hasAssertions();
    const { id } = mockState.kittens[mockState.currentIndex];
    const localIsSet = local.setLocalStorage(id);
    expect(localIsSet).toBeTruthy();

    await waitFor(() => {
      const storage = local.getLocalStorage();
      expect(storage).toStrictEqual(`${id}`);
    });
  });
});
