/**
 * @jest-environment jest-environment-jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import KittenDisplay from "../kittendisplay";

describe("kittenDisplay", () => {
  it("can render the webpage", async () => {
    render(<KittenDisplay />);
    const addButton = screen.getByTestId("add-button");
    await addButton.then(
      expect(document.title).toBe("myClowder"),
    );
  });

  it("can render the kitten list", () => {
    expect.hasAssertions();

    // Test first render and componentDidMount
    render(<KittenDisplay />);
    const addButton = screen.getByTestId("add-button");
    expect(addButton.textContent).toBe("+");

    // Test second render and componentDidUpdate
    // expect(kitten.textContent).toBe("You clicked 1 times");
    // expect(document.title).toBe("You clicked 1 times");
  });
});
