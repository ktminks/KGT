import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import kittens from "../components/mocks/kittens";
// import defaultState from "../_utilities/data";

// let container = null;
// const App = require("../App").default;
const kittenService = {
  searchKittens: async (searchTerm) => (
    kittens.filter((e) => e.name === searchTerm)
      .then((filteredKittens) => {
        if (filteredKittens.length >= 0) console.log("Kitten found!");
        else console.log("Kitten not found!");
        // setLocalStorage(filteredKittens, 0);
        return { foundKittens: filteredKittens };
      })
  ),
  resetKittens: async () => {},
  retrieveKittens: async () => {},
  deleteKitten: async () => {},
  addKitten: async () => {},
  editKitten: async () => {},
};
describe("home", () => {
  it("matches the snapshot", () => {
    expect.hasAssertions();
    const { asFragment } = render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
    />, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the navbar", async () => {
    expect.hasAssertions();
    render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
    />, { wrapper: BrowserRouter });
    await waitFor(() => {
      const navbar = screen.getByTestId("navbar");
      expect(navbar).toBeDefined();
      expect(navbar).toBeInTheDocument();
    });
  });

  it("renders the dashboard", async () => {
    expect.hasAssertions();
    render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
    />, { wrapper: BrowserRouter });
    await waitFor(() => {
      const dashboard = screen.getByTestId("dashboard");
      expect(dashboard).toBeDefined();
      expect(dashboard).toBeInTheDocument();
    });
  });

  it("renders the kitten display", async () => {
    expect.hasAssertions();
    render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
    />, { wrapper: BrowserRouter });

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

  it("changes the search box text", async () => {
    expect.hasAssertions();
    render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
    />, { wrapper: BrowserRouter });

    let searchInput = screen.getByTestId("search-input");
    await waitFor(() => fireEvent.change(searchInput, { target: { value: "Moarkitty" } }))
      .then(() => {
        searchInput = screen.getByTestId("search-input");
        expect(searchInput).toHaveValue("Moarkitty");
      });
  });
  it("sets a kitten as active upon searching", async () => {
    expect.hasAssertions();
    render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
    />, { wrapper: BrowserRouter });

    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");
    expect(searchButton).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "Moarkitty" } });
    expect(searchInput).toHaveValue("Moarkitty");

    await waitFor(() => {
      fireEvent.click(searchButton);
    }).then(() => {
      // waitForElementToBeRemoved(testKitty);
      expect(screen.queryByText("Testkitty")).toBeNull();
      expect(screen.getByTestId("Moarkitty0")).toHaveClass("active");
    });
  });

  it("renders the growth display", async () => {
    expect.hasAssertions();
    render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
    />, { wrapper: MemoryRouter });

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

  it.todo("renders the default state");
  it.todo("adds a kitten");
  it.todo("deletes a kitten");
  it.todo("updates a kitten");
});
