import React from "react";

const SearchBar = ({ handleSearch, handleReset }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const onSearch = async (e, term) => {
    e.preventDefault();
    setSearchTerm("");
    return handleSearch(term);
  };

  const onReset = async (e) => {
    e.preventDefault();
    setSearchTerm("");
    return handleReset();
  };

  return (
    <form className="d-flex" onSubmit={async (e) => { onSearch(e, searchTerm); }}>
      {/* <form className="d-flex" onSubmit={async (e) => { await onSearch(e, searchTerm); }}> */}
      <div className="input-group me-2">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          aria-label="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          className="btn btn-outline-secondary"
          type="submit"
          aria-label="search-button"
          value="Search"
        />
        <input
          className="btn btn-outline-secondary"
          type="button"
          aria-label="reset-button"
          value="Reset"
          onClick={async (e) => { await onReset(e); }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
