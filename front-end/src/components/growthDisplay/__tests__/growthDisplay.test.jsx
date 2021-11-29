import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GrowthDisplay from "..";
import kittens from "../../mocks/kittens";

describe("kittenDisplay", () => {
  beforeEach(() => {
    render(<GrowthDisplay
      kittens={kittens}
      currentIndex={0}
      handleSetActive={jest.fn()}
    />, { wrapper: MemoryRouter });
  });

  it("renders the kitten list", async () => {
    expect.hasAssertions();

    await waitFor(() => {
      const kittenList = screen.getByTestId("kitten-list-growth");
      expect(kittenList).toBeInTheDocument();
    });
  });

  it("renders the test kittens", async () => {
    expect.hasAssertions();

    await waitFor(() => {
      const testKitty = screen.getByTestId("Testkitty0");
      expect(testKitty).toBeInTheDocument();
    });
  });

  it("renders the currentKitten component", async () => {
    expect.hasAssertions();
    await waitFor(() => {
      const currentKitten = screen.getByTestId("current-kitten-growth");
      expect(currentKitten).toBeInTheDocument();
    });
  });

  it("renders the correct kitten on click", async () => {
    expect.hasAssertions();
    await waitFor(() => {
      const testKitty = screen.getByTestId("Testkitty0");
      fireEvent.click(testKitty);
    }).then(() => {
      const currentKitten = screen.getByTestId("current-kitten-growth");
      expect(currentKitten).toBeInTheDocument();
    });
  });
});
