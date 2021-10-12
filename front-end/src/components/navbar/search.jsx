import React from "react";

const SearchKittens = ({ searchName, reset }) => {
  const [searchTerm, changeName] = React.useState("");

  const handleSearch = (e, term) => {
    e.preventDefault();
    searchName(term);
    changeName("");
  };

  return (
    <form className="d-flex" onSubmit={(e) => handleSearch(e, searchTerm)}>
      <div className="input-group me-2">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          value={searchTerm}
          onChange={(e) => changeName(e.target.value)}
        />
        <input
          className="btn btn-outline-secondary"
          type="submit"
          value="Search"
          data-testid="search-button"
        />
        <input
          className="btn btn-outline-secondary"
          type="button"
          value="Reset"
          onClick={(e) => reset(e)}
          data-testid="reset-button"
        />
      </div>
    </form>
  );
};

export default SearchKittens;
