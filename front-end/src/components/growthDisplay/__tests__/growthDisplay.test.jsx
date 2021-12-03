import React from "react";
import {
  render, screen, waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GrowthDisplay from "..";
import kittens from "../../../mocks/kittens";

describe("growthDisplay", () => {
  beforeEach(() => {
    render(<GrowthDisplay
      kittens={kittens}
      currentIndex={0}
      handleSetActive={jest.fn()}
    />, { wrapper: MemoryRouter });
  });

  it("renders the kitten list", async () => {
    expect.hasAssertions();
    const kittenList = screen.getByRole("list", { name: "kitten-list-growth" });
    await waitFor(() => expect(kittenList).toBeInTheDocument());
  });

  it("renders the test kittens", async () => {
    expect.hasAssertions();
    const moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    await waitFor(() => expect(moarKitty).toBeInTheDocument());
  });

  it("renders the currentKitten component", async () => {
    expect.hasAssertions();
    const currentKitten = screen.getByRole("region", { name: "current-kitten-growth" });
    await waitFor(() => expect(currentKitten).toBeInTheDocument());
  });
});
