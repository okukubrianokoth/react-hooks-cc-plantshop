import React from "react";

function Search({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search plants..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default Search;
