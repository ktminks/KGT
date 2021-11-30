import React from "react";

const SearchBar = ({ handleSearch, handleReset }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const onSearch = async (e, term) => {
    e.preventDefault();
    setSearchTerm("");
    await handleSearch(term);
  };

  const onReset = async (e) => {
    e.preventDefault();
    setSearchTerm("");
    await handleReset();
  };

  return (
    <form className="d-flex" onSubmit={(e) => onSearch(e, searchTerm)}>
      <div className="input-group me-2">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          data-testid="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          className="btn btn-outline-secondary"
          type="submit"
          data-testid="search-button"
          value="Search"
        />
        <input
          className="btn btn-outline-secondary"
          type="button"
          data-testid="reset-button"
          value="Reset"
          onClick={(e) => onReset(e)}
        />
      </div>
    </form>
  );
};

export default SearchBar;
