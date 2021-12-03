import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import mockKittens from "../mocks/kittens";
// import defaultState from "../_utilities/data";

// let container = null;
// const App = require("../App").default;
const kittenList = [...mockKittens];

const kittenService = {
  searchKittens: async (searchTerm) => {
    try {
      const filteredKittens = kittenList.filter((e) => e.name === searchTerm);
      if (filteredKittens.length >= 0) console.log("Kitten found!");
      else console.log("Kitten not found!");
      // setLocalStorage(filteredKittens, 0);
      return { foundKittens: filteredKittens };
    } catch (error) { console.error(error); }
    return { foundKittens: [] };
  },
  resetKittens: async () => ({ newKittens: kittenList }),
  retrieveKittens: async () => {},
  deleteKitten: async () => {},
  addKitten: async (kitten) => {
    console.log("Kitten added");
    return kitten;
  },
  editKitten: async () => {},
  getKittenIndex: async (id, kittens) => {
    if (!id) return null;
    let newKittens;
    if (kittens) (newKittens = kittens);
    else (newKittens = kittenList);
    const index = newKittens.findIndex((kitten) => kitten.id === id);
    return index;
  },
  saveCurrentKitten: (id) => {
    try {
      localStorage.setItem("kittenID", id);
      return true;
    } catch (e) { console.error(e); }
    return false;
  },
  getCurrentKitten: () => localStorage.getItem("kittenID"),
};
const authStatus = {
  loginButton: <a href="#!" className="nav-link">Login with Google</a>,
  logoutButton: <button className="nav-link" type="button" onClick={() => {}}>Logout</button>,
};

const openDisplay = () => {
  const link = screen.getByRole("link", { name: "kittendisplay-link" });
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
  const kittenDisplay = screen.getByRole("main", { name: "kitten-display" });
  expect(kittenDisplay).toBeInTheDocument();
};

const renderDefault = (open, wrapper = MemoryRouter) => {
  const home = (render(<Home
    kittenService={kittenService}
    defaultKittens={kittenList}
    useAuthStatus={jest.fn(() => authStatus)}
  />, { wrapper }));
  if (!open) return home;
  return openDisplay();
};

describe("the app renders", () => {
  it("matches the snapshot", () => {
    expect.hasAssertions();
    const { asFragment } = renderDefault();
    expect(asFragment()).toMatchSnapshot();
  });

  it("the navbar", async () => {
    expect.hasAssertions();
    renderDefault();
    const navbar = screen.getByRole("navigation");
    await waitFor(() => expect(navbar).toBeInTheDocument());
  });

  it("the dashboard", async () => {
    expect.hasAssertions();
    renderDefault();
    const dashboard = screen.getByRole("main", { name: "dashboard" });
    await waitFor(() => expect(dashboard).toBeInTheDocument());
  });

  it("the kitten display", async () => {
    expect.hasAssertions();
    renderDefault("open");
  });

  it("the growth display", async () => {
    expect.hasAssertions();
    renderDefault();
    const link = screen.getByRole("link", { name: "growthdisplay-link" });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const growthDisplay = screen.getByRole("main", { name: "growth-display" });
    await waitFor(() => expect(growthDisplay).toBeInTheDocument());
  });

  it("renders the correct kitten on click", async () => {
    expect.hasAssertions();
    renderDefault("open");
    const firstKitten = screen.getByRole("listitem", { name: "Moarkitty" });
    const name = firstKitten.textContent;
    fireEvent.click(firstKitten);
    let kittenView;
    await waitFor(() => {
      kittenView = screen.getByRole("region", { name: "current-kitten" });
      expect(kittenView).toBeInTheDocument();
    });
    await waitFor(() => {
      const currentKitten = screen.getByTestId(name);
      expect(currentKitten).toBeInTheDocument();
    });
  });
  it.todo("the default state");
});

describe("the app sets a kitten as active", () => {
  it("on click", async () => {
    expect.hasAssertions();
    renderDefault("open");

    const moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    expect(moarKitty).toBeInTheDocument();
    fireEvent.click(moarKitty);

    await waitFor(() => {
      const activeKitten = screen.getByRole("listitem", { name: "active" });
      expect(activeKitten).toHaveTextContent("Moarkitty");
    });
  });

  it("on key down", async () => {
    expect.hasAssertions();
    renderDefault("open");

    const moarKitty = screen.getByRole("listitem", { name: "Moarkitty" });
    expect(moarKitty).toBeInTheDocument();
    fireEvent.keyDown(moarKitty, { key: "1" });

    await waitFor(() => {
      const activeKitten = screen.getByRole("listitem", { name: "active" });
      expect(activeKitten).toHaveTextContent("Moarkitty");
    });
  });

  it("upon searching", async () => {
    expect.hasAssertions();
    renderDefault("open");

    // type name in search box
    const searchInput = screen.getByRole("searchbox", { name: "search-input" });
    fireEvent.change(searchInput, { target: { value: "Moarkitty" } });
    await waitFor(() => expect(searchInput).toHaveValue("Moarkitty"));

    // hit search button
    const searchButton = screen.getByRole("button", { name: "search-button" });
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);

    // wait for search to complete, check that kitten that was searched for is active
    // let testKitty = screen.getByRole("listitem", { name: "Testkitty" });
    await waitFor(() => {
      const activeKitten = screen.getByRole("listitem", { name: "active" });
      expect(activeKitten).toHaveTextContent("Moarkitty");
    });

    expect(screen.queryByText("Testkitty")).not.toBeInTheDocument();
  });

  it("upon reset after search", async () => {
    expect.hasAssertions();
    renderDefault("open");

    // type name in search box
    const searchInput = screen.getByRole("searchbox", { name: "search-input" });
    fireEvent.change(searchInput, { target: { value: "Moarkitty" } });
    await waitFor(() => expect(searchInput).toHaveValue("Moarkitty"));

    // hit search button
    const searchButton = screen.getByRole("button", { name: "search-button" });
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);

    // wait for search to complete, check that kitten that was searched for is active
    // let testKitty = screen.getByRole("listitem", { name: "Testkitty" });
    await waitFor(() => {
      const activeKitten = screen.getByRole("listitem", { name: "active" });
      expect(activeKitten).toHaveTextContent("Moarkitty");
    });

    // hit reset button
    const resetButton = screen.getByRole("button", { name: "reset-button" });
    fireEvent.click(resetButton);

    // check that kitten that was searched for is still active
    await waitFor(() => {
      const activeKitten = screen.getByRole("listitem", { name: "active" });
      const testKitty = screen.getByRole("listitem", { name: "Testkitty" });
      expect(testKitty).toBeInTheDocument();
      expect(activeKitten).toHaveTextContent("Moarkitty");
    });
  });

  it("after adding it", async () => {
    expect.hasAssertions();
    renderDefault("open", BrowserRouter);

    // open the add form
    const addButton = screen.getByRole("link", { name: "add-button" });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    const addKittenForm = screen.getByRole("region", { name: "add-kitten" });
    await waitFor(() => expect(addKittenForm).toBeInTheDocument());

    // get the name value from the form
    const { value: kittenName } = screen.getByRole("textbox", { name: "kitten-name" });

    // submit the form
    const saveKittenButton = screen.getByRole("button", { name: "save-kitten" });
    fireEvent.click(saveKittenButton);

    // expect the new kitten to show up in the list as active
    await waitFor(() => {
      const activeKitten = screen.getByRole("listitem", { name: "active" });
      expect(activeKitten).toHaveTextContent(kittenName);
    });
  });
});

describe("the search feature", () => {
  // search function
  it("changes the search box text", async () => {
    expect.hasAssertions();
    renderDefault();

    let searchInput = screen.getByRole("searchbox", { name: "search-input" });
    fireEvent.change(searchInput, { target: { value: "Moarkitty" } });
    searchInput = screen.getByRole("searchbox", { name: "search-input" });
    await waitFor(() => expect(searchInput).toHaveValue("Moarkitty"));
  });
});

describe("the kitten manager", () => {
  describe("the add feature", () => {
    it("estimates a kitten's age", async () => {
      expect.hasAssertions();
      renderDefault("open");

      // open the add form
      const addButton = screen.getByRole("link", { name: "add-button" });
      expect(addButton).toBeInTheDocument();
      fireEvent.click(addButton);
      const addKittenForm = screen.getByRole("region", { name: "add-kitten" });
      await waitFor(() => expect(addKittenForm).toBeInTheDocument());

      // get the birthdate value from the form
      const { value: weight } = screen.getByRole("spinbutton", { name: "weight" });
      expect(weight).toBeDefined();

      // estimate the kitten's age
      const estimateAgeButton = screen.getByRole("button", { name: "estimate-age" });
      fireEvent.click(estimateAgeButton);

      // expect an estimation to be displayed
      await waitFor(() => {
        const ageCalculation = screen.getByRole("listitem", { name: "age-calculation" });
        // expect(newKitten).toHaveClass("active");
        expect(ageCalculation).toBeInTheDocument();
      });
      // expect(saveKittenButton).not.toBeInTheDocument();
    });

    it("adds a kitten", async () => {
      expect.hasAssertions();
      renderDefault(null, BrowserRouter);

      // open the add form
      const addButton = screen.getByRole("link", { name: "add-button" });
      expect(addButton).toBeInTheDocument();
      fireEvent.click(addButton);
      const addKittenForm = screen.getByRole("region", { name: "add-kitten" });
      await waitFor(() => expect(addKittenForm).toBeInTheDocument());

      // get the name value from the form
      const { value: kittenName } = screen.getByRole("textbox", { name: "kitten-name" });

      // submit the form
      const saveKittenButton = screen.getByRole("button", { name: "save-kitten" });
      fireEvent.click(saveKittenButton);

      // expect the new kitten to show up in the list
      await waitFor(() => {
        const newKitten = screen.getByRole("listitem", { name: "active" });
        expect(newKitten).toBeInTheDocument();
        expect(newKitten).toHaveTextContent(kittenName);
      });
    // expect(saveKittenButton).not.toBeInTheDocument();
    });
  });

  describe("the edit feature", () => {
    it.todo("edits a kitten");
  });
  describe("the delete feature", () => {
    it.todo("deletes a kitten");
  });
});

describe("the localStorage feature", () => {
  it("remembers the last viewed kitten", () => {
    expect.hasAssertions();
    renderDefault("open");
    localStorage.setItem("kittenID", "1");
    const storage = localStorage.getItem("kittenID");
    expect(storage).toBe("1");
  });
  it.todo("loads last viewed kitten on app mount if localStorage populated");
  it.todo("loads kittens[0] on app mount if localStorage empty");
});
