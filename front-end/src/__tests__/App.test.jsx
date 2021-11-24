import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// let container = null;
// const App = require("../App").default;

describe("app", () => {
  beforeEach(() => {
    render(<App />, { wrapper: MemoryRouter });
  });

  it("renders the navbar", async () => {
    expect.hasAssertions();
    await waitFor(() => {
      const navbar = screen.getByTestId("navbar");
      expect(navbar).toBeDefined();
      expect(navbar).toBeInTheDocument();
    });
  });

  it("renders the dashboard", async () => {
    expect.hasAssertions();
    await waitFor(() => {
      const dashboard = screen.getByTestId("dashboard");
      expect(dashboard).toBeDefined();
      expect(dashboard).toBeInTheDocument();
    });
  });

  it("matches the snapshot", () => {
    expect.hasAssertions();
    const { asFragment } = render(<App />, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the kitten display", async () => {
    expect.hasAssertions();
    await waitFor(() => {
      const link = screen.getByTestId("kittendisplay-link");
      expect(link).toBeInTheDocument();
      fireEvent.click(link);
    }).then(() => {
      const kittenDisplay = screen.getByTestId("kitten-display");
      expect(kittenDisplay).toBeDefined();
      expect(kittenDisplay).toBeInTheDocument();
    });
  });

  it("renders the growth display", async () => {
    expect.hasAssertions();
    await waitFor(() => {
      const link = screen.getByTestId("growthdisplay-link");
      expect(link).toBeInTheDocument();
      fireEvent.click(link);
    }).then(() => {
      const growthDisplay = screen.getByTestId("growth-display");
      expect(growthDisplay).toBeDefined();
      expect(growthDisplay).toBeInTheDocument();
    });
  });

  it.todo("renders the mock state");
});
