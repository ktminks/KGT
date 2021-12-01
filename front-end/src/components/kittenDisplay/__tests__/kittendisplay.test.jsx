import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import KittenDisplay from "../kittendisplay";
import kittens from "../../../mocks/kittens";

describe("kittenDisplay", () => {
  beforeEach(() => {
    let currentIndex = 0;
    const setCurrentIndex = ((index) => (currentIndex = index));
    render(<KittenDisplay
      kittens={kittens}
      currentIndex={currentIndex}
      handleSetActive={(id, index) => setCurrentIndex(index)}
      handleAdd={jest.fn()}
      handleDelete={jest.fn()}
      handleEdit={jest.fn()}
    />, { wrapper: MemoryRouter });
  });

  it("renders the add button correctly", async () => {
    expect.hasAssertions();
    const addButton = screen.getByRole("link", { name: "add-button" });
    await waitFor(() => expect(addButton).toBeInTheDocument());
  });

  it("renders the kitten list", async () => {
    expect.hasAssertions();
    const kittenList = screen.getByRole("list", { name: "kitten-list" });
    await waitFor(() => expect(kittenList).toBeInTheDocument());
  });

  it("renders the test kittens", async () => {
    expect.hasAssertions();
    const moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    await waitFor(() => expect(moarKitty).toBeInTheDocument());
  });

  it("renders the currentKitten component", async () => {
    expect.hasAssertions();
    const currentKitten = screen.getByRole("region", { name: "current-kitten" });
    await waitFor(() => expect(currentKitten).toBeInTheDocument());
  });

  it("renders the correct kitten on click", async () => {
    expect.hasAssertions();
    const firstKitten = screen.getAllByRole("listitem", { name: "active" || "Testkitty" })[0];
    const name = firstKitten.textContent;
    fireEvent.click(firstKitten);
    const kittenView = screen.getByRole("region", { name: "current-kitten" });
    expect(kittenView).toBeInTheDocument();
    const currentKitten = screen.getByTestId(name);
    await waitFor(() => expect(currentKitten).toStrictEqual(kittenView));
  });
  it.todo("renders the edit kitten form on clicking edit");
  it.todo("returns to kitten details on clicking back");
  it.todo("returns to kitten details on clicking submit edit");

  it("opens the add kitten form on clicking +", async () => {
    expect.hasAssertions();
    const addButton = screen.getByRole("link", { name: "add-button" });
    fireEvent.click(addButton);
    const addKittenForm = screen.getByRole("region", { name: "add-kitten" });
    await waitFor(() => expect(addKittenForm).toBeInTheDocument());
  });

  it.todo("closes the add kitten form on clicking back");
});
