import React from "react";
import { MemoryRouter } from "react-router-dom";
import {
  render, screen, waitFor,
} from "@testing-library/react";
import KittenList from "..";
import kittens from "../../../mocks/kittens";

describe("kitten list", () => {
  let currentIndex = 0;
  const setCurrentIndex = ((index) => (currentIndex = index));
  beforeEach(() => {
    setCurrentIndex(0);
    render(<KittenList
      kittens={kittens}
      handleSetActive={(id, index) => setCurrentIndex(index)}
      currentIndex={currentIndex}
    />, { wrapper: MemoryRouter });
  });
  it("should render a list of kittens", async () => {
    expect.assertions(1);
    const moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    await waitFor(() => expect(moarKitty).toBeInTheDocument());
  });

  it("should display the kitten's name", async () => {
    expect.assertions(1);
    const moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    await waitFor(() => expect(moarKitty).toHaveTextContent("Moarkitty"));
  });
});
