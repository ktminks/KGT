import React from "react";
import { render, screen } from "@testing-library/react";
import SearchKittens from "../search";

describe("searchKittens", () => {
  it("can find a kitten from the list", () => {
    render(<SearchKittens />);
    const searchButton = screen.getByTestId("search-button");

    expect(searchButton.value).toBe("Search");
  });

  it("can reset the list", () => {
    expect.hasAssertions();

    // Test first render and componentDidMount
    render(<SearchKittens />);
    const resetButton = screen.getByTestId("reset-button");
    expect(resetButton.value).toBe("Reset");

    // Test second render and componentDidUpdate
    // expect(kitten.textContent).toBe("You clicked 1 times");
    // expect(document.title).toBe("You clicked 1 times");
  });
});
