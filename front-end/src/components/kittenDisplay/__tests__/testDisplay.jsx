import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../../App";

describe("kittenDisplay", () => {
  it("can render the kitten list", async () => {
    expect.hasAssertions();

    // Test first render and componentDidMount
    render(<App />);
    const kittenDisplayLink = screen.getByTestId("kitten-display-link");
    fireEvent.click(kittenDisplayLink);

    await screen.findByTestId("kitten-display")
      .then(() => {
        // Locate kitten list
        const kittenList = screen.getByTestId("kittens-list");
        expect(kittenList).toBeTruthy();

        // Locate current kitten display
        const currentKitten = screen.getByTestId("current-kitten");
        expect(currentKitten).toBeTruthy();
      });
  });

  it("can add a kitten", async () => {
    expect.hasAssertions();

    // Test first render and componentDidMount
    render(<App />);
    const kittenDisplayLink = screen.getByTestId("kitten-display-link");
    fireEvent.click(kittenDisplayLink);

    await screen.findByTestId("kitten-display")
      .then(() => {
        // Locate button to open add component
        const openAdd = screen.getByTestId("open-add-screen");
        expect(openAdd.textContent).toBe("+");

        // Open add component
        fireEvent.click(openAdd);
        const addKittenPage = screen.getByTestId("add-kitten-page");
        expect(addKittenPage).toBeTruthy();

        // Click add component
        const addKittenButton = screen.getByTestId("save-kitten-button");
        fireEvent.click(addKittenButton);

        // await screen.findByTestId("current-kitten")
        //   .then((page) => expect(page).toBeTruthy());
      });
  });
});
