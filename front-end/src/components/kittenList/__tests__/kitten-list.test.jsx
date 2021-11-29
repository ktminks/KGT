import React from "react";
import { MemoryRouter } from "react-router-dom";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import KittenList from "..";
import kittens from "../../mocks/kittens";

describe("kitten list", () => {
  beforeEach(() => {
    let currentIndex = 0;
    const setCurrentIndex = ((index) => (currentIndex = index));
    render(<KittenList
      kittens={kittens}
      handleSetActive={(id, index) => setCurrentIndex(index)}
      currentIndex={currentIndex}
    />, { wrapper: MemoryRouter });
  });
  it("should render a list of kittens", async () => {
    expect.assertions(1);
    await waitFor(() => expect(screen.getByTestId("Moarkitty1")).toBeInTheDocument());
  });

  it("should display the kitten's name", async () => {
    expect.assertions(1);
    await waitFor(() => expect(screen.getByTestId("Moarkitty1")).toHaveTextContent("Moarkitty"));
  });

  it("should set the kitten as active on click", async () => {
    expect.assertions(2);
    await waitFor(() => {
      const moarKitty = screen.getByTestId("Moarkitty1");
      expect(screen.getByTestId("Moarkitty1")).not.toHaveClass("active");
      fireEvent.click(moarKitty);
    }).then(() => {
      render(<KittenList />);
      expect(screen.getByTestId("Moarkitty1")).toHaveClass("active");
    });
  });

  it("should set the kitten as active on key down", async () => {
    expect.assertions(2);
    await waitFor(() => {
      const moarKitty = screen.getByTestId("Moarkitty1");
      expect(screen.getByTestId("Moarkitty1")).not.toHaveClass("active");
      fireEvent.keyDown(moarKitty, { key: "1" });
    }).then(() => {
      render(<KittenList />);
      expect(screen.getByTestId("Moarkitty1")).toHaveClass("active");
    });
  });
});
