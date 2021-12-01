import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";
import mockKittens from "../components/mocks/kittens";
// import defaultState from "../_utilities/data";

// let container = null;
// const App = require("../App").default;
const kittenService = {
  searchKittens: async (searchTerm) => {
    try {
      const filteredKittens = mockKittens.filter((e) => e.name === searchTerm);
      if (filteredKittens.length >= 0) console.log("Kitten found!");
      else console.log("Kitten not found!");
      // setLocalStorage(filteredKittens, 0);
      return { foundKittens: filteredKittens };
    } catch (error) { console.error(error); }
    return { foundKittens: [] };
  },
  resetKittens: async () => ({ newKittens: mockKittens }),
  retrieveKittens: async () => {},
  deleteKitten: async () => {},
  addKitten: async () => {},
  editKitten: async () => {},
  getKittenIndex: async (id, kittens) => {
    if (!id) return null;
    let newKittens;
    if (kittens) (newKittens = kittens);
    else (newKittens = mockKittens);
    console.log({ newKittens });
    const index = newKittens.findIndex((kitten) => kitten.id === id);
    console.log(index);
    return index;
  },
};
const authStatus = {
  loginButton: <a href="#!" className="nav-link">Login with Google</a>,
  logoutButton: <button className="nav-link" type="button" onClick={() => {}}>Logout</button>,
};

describe("home", () => {
  const openDisplay = () => {
    const link = screen.getByRole("link", { name: "kittendisplay-link" });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const kittenDisplay = screen.getByRole("main", { name: "kitten-display" });
    expect(kittenDisplay).toBeInTheDocument();
  };

  const renderDefault = () => (render(<Home
    kittenService={kittenService}
    defaultKittens={mockKittens}
    useAuthStatus={jest.fn(() => authStatus)}
  />, { wrapper: MemoryRouter }));

  it("matches the snapshot", () => {
    expect.hasAssertions();
    const { asFragment } = renderDefault();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the navbar", async () => {
    expect.hasAssertions();
    renderDefault();
    const navbar = screen.getByRole("navigation");
    await waitFor(() => expect(navbar).toBeInTheDocument());
  });

  it("renders the dashboard", async () => {
    expect.hasAssertions();
    renderDefault();

    const dashboard = screen.getByRole("main", { name: "dashboard" });
    await waitFor(() => expect(dashboard).toBeInTheDocument());
  });

  it("renders the kitten display", async () => {
    expect.hasAssertions();
    renderDefault();
    openDisplay();
  });

  it("changes the search box text", async () => {
    expect.hasAssertions();
    renderDefault();

    let searchInput = screen.getByRole("textbox", { name: "search-input" });
    fireEvent.change(searchInput, { target: { value: "Moarkitty" } });
    searchInput = screen.getByRole("textbox", { name: "search-input" });
    await waitFor(() => expect(searchInput).toHaveValue("Moarkitty"));
  });

  it("sets the kitten as active on click", async () => {
    expect.hasAssertions();
    renderDefault();
    openDisplay();

    let moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    expect(moarKitty).not.toHaveClass("active");
    fireEvent.click(moarKitty);
    await waitFor(() => {
      moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
      expect(moarKitty).toHaveClass("active");
    });
  });

  it("sets the kitten as active on key down", async () => {
    expect.hasAssertions();
    renderDefault();
    openDisplay();

    let moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    expect(moarKitty).not.toHaveClass("active");
    fireEvent.keyDown(moarKitty, { key: "1" });
    await waitFor(() => {
      moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
      expect(moarKitty).toHaveClass("active");
    });
  });
  it("sets a kitten as active upon searching", async () => {
    expect.hasAssertions();
    renderDefault();
    openDisplay();

    const searchButton = screen.getByRole("button", { name: "search-button" });
    expect(searchButton).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", { name: "search-input" });
    fireEvent.change(searchInput, { target: { value: "Moarkitty" } });
    await waitFor(() => expect(searchInput).toHaveValue("Moarkitty"));

    fireEvent.click(searchButton);
    const moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    await waitFor(() => expect(moarKitty).toHaveClass("active"));

    expect(screen.queryByText("Testkitty")).not.toBeInTheDocument();
  });

  it("sets a found kitten as active upon reset after search", async () => {
    expect.hasAssertions();
    renderDefault();
    openDisplay();

    // type name in search box
    const searchInput = screen.getByRole("textbox", { name: "search-input" });
    fireEvent.change(searchInput, { target: { value: "Moarkitty" } });
    await waitFor(() => expect(searchInput).toHaveValue("Moarkitty"));

    // hit search button
    const searchButton = screen.getByRole("button", { name: "search-button" });
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);

    // wait for search to complete, check that kitten that was searched for is active
    let moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    let testKitty = screen.getByRole("listitem", { name: "Testkitty" });
    await waitFor(() => {
      expect(testKitty).not.toBeInTheDocument();
      expect(moarKitty).toHaveClass("active");
    });

    // hit reset button
    const resetButton = screen.getByRole("button", { name: "reset-button" });
    fireEvent.click(resetButton);

    // check that kitten that was searched for is still active
    await waitFor(() => {
      moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
      testKitty = screen.getByRole("listitem", { name: "Testkitty" });
      expect(testKitty).toBeInTheDocument();
      expect(moarKitty).toHaveClass("active");
    });
  });

  it("renders the growth display", async () => {
    expect.hasAssertions();
    renderDefault();

    const link = screen.getByRole("link", { name: "growthdisplay-link" });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const growthDisplay = screen.getByRole("main", { name: "growth-display" });
    await waitFor(() => expect(growthDisplay).toBeInTheDocument());
  });
  it.todo("renders the default state");
  it.todo("adds a kitten");
  it.todo("deletes a kitten");
  it.todo("updates a kitten");
});
