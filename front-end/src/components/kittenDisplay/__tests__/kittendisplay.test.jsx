import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import KittenDisplay from "../kittendisplay";

const kittens = [
  {
    id: 1,
    name: "Testkitty",
    sex: "F",
    birthdate: "09/02/2021",
    age: 0,
    milestones: {
      temperature: [[0, 0, 0]],
      eyes: [["", 0]],
      ears: [["", 0]],
      teeth: [["", 0]],
      litterTraining: [["", 0]],
      mobility: [["", 0]],
      socialization: [["", 0]],
      veterinary: [[0, 0]],
    },
    food: {
      foodtype: [["", 0]],
      capacity: [[0, 0]],
      frequency: [[0, 0]],
      weaning: [[false, 0]],
    },
    concerns: [["", 0]],
    weight: [[0, 0]],
  },
];

describe("kittenDisplay", () => {
  // beforeEach(() => {
  //   render(<KittenDisplay
  //     initKittens={kittens}
  //     initIndex={0}
  //     initKitten={kittens[0]}
  //     saveCurrentKitten={saveCurrentKitten}
  //   />, { wrapper: MemoryRouter });
  // });

  it("renders the add button correctly", async () => {
    expect.hasAssertions();
    await waitFor(() => {
      const addButton = screen.getByTestId("add-button");
      expect(addButton).toBeDefined();
      expect(addButton.textContent).toBe("+");
      expect(addButton).toBeInTheDocument();
    });
  });

  it("renders the kitten list", async () => {
    expect.hasAssertions();

    await waitFor(() => {
      const kittenList = screen.getByTestId("kitten-list");
      expect(kittenList).toBeDefined();
      expect(kittenList.textContent).toBe("Kittens");
      expect(kittenList).toBeInTheDocument();

      const testKitty = screen.getByTestId("Testkitty0");
      expect(testKitty).toBeDefined();
    });
    // add something about checking the state (kittens)
  });

  it("renders the currentKitten component", async () => {
    expect.hasAssertions();

    render(<KittenDisplay
      initKittens={kittens}
      initIndex={0}
      initKitten={kittens[0]}
      saveCurrentKitten={jest.fn()}
    />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const currentKitten = screen.getByTestId("current-kitten");
      expect(currentKitten).toBeDefined();
      expect(currentKitten).toBeInTheDocument();
    });
  });

  it("renders the correct kitten on click", async () => {
    expect.hasAssertions();

    const saveCurrentKitten = jest.fn();

    render(<KittenDisplay
      initKittens={kittens}
      initIndex={0}
      initKitten={kittens[0]}
      saveCurrentKitten={saveCurrentKitten}
    />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const testKitty = screen.getByTestId("Testkitty0");
      fireEvent.click(testKitty);
    }).then(() => {
      const currentKitten = screen.getByTestId("current-kitten");
      expect(currentKitten).toBeDefined();
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
      expect(addKittenForm).toBeDefined();
      expect(addKittenForm).toBeInTheDocument();
    });
  });

  it.todo("closes the add kitten form on clicking back");
});
