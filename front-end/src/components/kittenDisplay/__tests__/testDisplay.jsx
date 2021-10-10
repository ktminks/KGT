/**
 * @jest-environment jest-environment-jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import KittenDisplay from "../kittendisplay";

describe("kittenDisplay", () => {
  it("can render all kitten data from database & backend", () => {
    expect.hasAssertions();
    // Test first render and componentDidMount
    const { getByTestId } = render(<KittenDisplay />);
    const kitten = getByTestId("Pork Chop0");
    expect(kitten.textContent).toBe("Pork Chop");
    // expect(document.title).toBe("You clicked 0 times");

    // Test second render and componentDidUpdate
    // expect(kitten.textContent).toBe("You clicked 1 times");
    // expect(document.title).toBe("You clicked 1 times");
  });
});
