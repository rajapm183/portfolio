import React from "react";

const SearchField = ({ onSearch }) => {
  return (
    <>
      <div className="float-right" style={{ display: "flex" }}>
        <input
          id="search_id"
          type="text"
          placeholder="Search"
          style={{ marginRight: 0 }}
        />
        <button type="button" className="btn btn-primary" onClick={onSearch}>
          Search
        </button>
      </div>
    </>
  );
};

export default SearchField;
