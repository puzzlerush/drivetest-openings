import React from "react";

function Filter(props) {
  return (
    <form class="m-4">
      <input
        type="text"
        id="filter-input"
        className="form-control"
        placeholder="Search for a location"
      />
    </form>
  );
}

export default Filter;