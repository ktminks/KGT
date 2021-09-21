import React, { Component } from "react";

class SearchKittens extends Component {
  render() {
    const { searchName, onChange, onSearch } = this.props;
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchName}
          onChange={onChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchKittens;
