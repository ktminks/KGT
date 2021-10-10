import React from "react";

const SearchKittens = ({ searchName }) => {
  const [searchTerm, changeName] = React.useState("");
  return (
    <form className="d-flex" onSubmit={(e) => searchName(e, searchTerm)}>
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
        />
      </div>
    </form>
  );
};

export default SearchKittens;
