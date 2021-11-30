import React from "react";
import {
  render, screen, waitFor, fireEvent, act,
} from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import kittens from "../components/mocks/kittens";
// import defaultState from "../_utilities/data";

// let container = null;
// const App = require("../App").default;
const kittenService = {
  searchKittens: async (searchTerm) => {
    try {
      const filteredKittens = kittens.filter((e) => e.name === searchTerm);
      if (filteredKittens.length >= 0) console.log("Kitten found!");
      else console.log("Kitten not found!");
      // setLocalStorage(filteredKittens, 0);
      return { foundKittens: filteredKittens };
    } catch (error) { console.error(error); }
    return { foundKittens: [] };
  },
  resetKittens: async () => {},
  retrieveKittens: async () => {},
  deleteKitten: async () => {},
  addKitten: async () => {},
  editKitten: async () => {},
};
const authStatus = {
  loginButton: <a href="#!" className="nav-link">Login with Google</a>,
  logoutButton: <button className="nav-link" type="button" onClick={() => {}}>Logout</button>,
};

describe("home", () => {
  it("matches the snapshot", () => {
    expect.hasAssertions();
    const { asFragment } = render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
      useAuthStatus={jest.fn(() => authStatus)}
    />, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the navbar", async () => {
    expect.hasAssertions();
    render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
      useAuthStatus={jest.fn(() => authStatus)}
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
      useAuthStatus={jest.fn(() => authStatus)}
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
      useAuthStatus={jest.fn(() => authStatus)}
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
      useAuthStatus={jest.fn(() => authStatus)}
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
    await waitFor(() => render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
      useAuthStatus={jest.fn(() => authStatus)}
    />, { wrapper: BrowserRouter }))
      .then(() => {
        const searchInput = screen.getByTestId("search-input");
        const searchButton = screen.getByTestId("search-button");
        expect(searchButton).toBeInTheDocument();
        fireEvent.change(searchInput, { target: { value: "Moarkitty" } });
        expect(searchInput).toHaveValue("Moarkitty");

        return act(() => waitFor(() => {
          fireEvent.click(searchButton);
        }).then(() => expect(screen.getByTestId("Moarkitty0")).toHaveClass("active")));
      });

    // expect(screen.getByTestId("Testkitty0")).not.toBeInTheDocument();
  });

  it("sets the kitten as active on click", async () => {
    expect.hasAssertions();
    await waitFor(() => render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
      useAuthStatus={jest.fn(() => authStatus)}
    />, { wrapper: BrowserRouter }))
      .then(() => {
        const moarKitty = screen.getByTestId("Moarkitty1");
        expect(moarKitty).not.toHaveClass("active");
        fireEvent.click(moarKitty);
        return expect(moarKitty).toHaveClass("active");
      });
  });

  it("sets the kitten as active on key down", async () => {
    expect.hasAssertions();
    await waitFor(() => render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
      useAuthStatus={jest.fn(() => authStatus)}
    />, { wrapper: BrowserRouter }))
      .then(() => {
        const moarKitty = screen.getByTestId("Moarkitty1");
        expect(moarKitty).not.toHaveClass("active");
        fireEvent.keyDown(moarKitty, { key: "1" });
        return expect(moarKitty).toHaveClass("active");
      });
  });

  it("renders the growth display", async () => {
    expect.hasAssertions();
    render(<Home
      kittenService={kittenService}
      defaultKittens={kittens}
      useAuthStatus={jest.fn(() => authStatus)}
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
