import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import KittenDisplay from "../kittendisplay";
import kittens from "../../mocks/kittens";

describe("kittenDisplay", () => {
  beforeEach(() => {
    render(<KittenDisplay
      kittens={kittens}
      currentIndex={0}
      handleSetActive={jest.fn()}
      handleAdd={jest.fn()}
      handleDelete={jest.fn()}
      handleEdit={jest.fn()}
    />, { wrapper: MemoryRouter });
  });

  it("renders the add button correctly", async () => {
    expect.hasAssertions();
    await waitFor(() => {
      const addButton = screen.getByTestId("add-button");
      expect(addButton).toBeInTheDocument();
    });
  });

  it("renders the kitten list", async () => {
    expect.hasAssertions();

    await waitFor(() => {
      const kittenList = screen.getByTestId("kitten-list");
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
      const currentKitten = screen.getByTestId("current-kitten");
      expect(currentKitten).toBeInTheDocument();
    });
  });

  it("renders the correct kitten on click", async () => {
    expect.hasAssertions();
    await waitFor(() => {
      const testKitty = screen.getByTestId("Testkitty0");
      fireEvent.click(testKitty);
    }).then(() => {
      const currentKitten = screen.getByTestId("current-kitten");
      expect(currentKitten).toBeInTheDocument();
    });
  });

  it.todo("renders the edit kitten form on clicking edit");
  it.todo("returns to kitten details on clicking back");
  it.todo("returns to kitten details on clicking submit edit");

  it("opens the add kitten form on clicking +", async () => {
    expect.hasAssertions();

    await waitFor(() => {
      const addButton = screen.getByTestId("add-button");
      fireEvent.click(addButton);
    }).then(() => {
      const addKittenForm = screen.getByTestId("add-kitten");
      expect(addKittenForm).toBeInTheDocument();
    });
  });

  it.todo("closes the add kitten form on clicking back");
});
