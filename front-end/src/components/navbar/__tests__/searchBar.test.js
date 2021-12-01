import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import kittens from "../../mocks/kittens";
import SearchBar from "../searchBar";

describe("searchBar", () => {
  beforeEach(() => {
    render(<SearchBar
      handleSearch={() => {}}
      handleReset={() => {}}
    />);
  });
  it.todo("renders correctly");
});
