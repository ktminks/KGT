import React from "react";
import { render } from "@testing-library/react";
import App from "../../App";

describe("app", () => {
  it("can render and update a counter", () => {
    expect.hasAssertions();
    // Test first render and componentDidMount
    const { getByTestId } = render(<App />);
    const label = getByTestId();
    expect(label.textContent).toBe("You clicked 0 times");
    expect(document.title).toBe("You clicked 0 times");

    // Test second render and componentDidUpdate
    expect(label.textContent).toBe("You clicked 1 times");
    expect(document.title).toBe("You clicked 1 times");
  });
});
