import React, { useState } from "react";

function Filter(props) {
  function handleChange(e) {
    if (e.target.value) {
      props.setFilter(e.target.value);
    } else {
      props.setFilter(".*");
    }
    
  }
  return (
    <input
      type="text"
      id="filter-input"
      className="form-control m-4"
      placeholder="Search for a location"
      onChange={handleChange}
    />
  );
}

export default Filter;