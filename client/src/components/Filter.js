import React, { useState } from "react";
import moment from "moment";

function Filter(props) {
  function handleFilterChange(e) {
    if (e.target.value) {
      props.setFilter(e.target.value);
    } else {
      props.setFilter(".*");
    }
  }
  
  function handleStartChange(e) {
    if (e.target.value) {
      props.setStartDate(e.target.value);
    }
  }
  
  function handleEndChange(e) {
    if (e.target.value) {
      props.setEndDate(e.target.value);
    }
  }
  
  const startDate = moment(props.startDate).tz('America/New_York').format("YYYY-MM-DD")
  const endDate = moment(props.endDate).tz('America/New_York').format("YYYY-MM-DD")
  
  return (
    <div class="form-wrapper">
      <input
        type="text"
        id="filter-input"
        className=""
        placeholder="Search location"
        onChange={handleFilterChange}
      />
      <input 
        type="date"
        id="start-date"
        className=""
        value={startDate}
        onChange={handleStartChange}
      />
      <input 
        type="date"
        id="end-date"
        className=""
        value={endDate}
        onChange={handleEndChange}
      />
    </div>
    
  );
}

export default Filter;