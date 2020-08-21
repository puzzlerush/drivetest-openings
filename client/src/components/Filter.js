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
    <div class="grid-container">
      <div class="grid-item grid-item-filter">
        <input
          type="text"
          id="filter-input"
          className="form-control"
          placeholder="Search location"
          onChange={handleFilterChange}
        />
      </div>
      <small class="grid-item grid-item-startlabel">Showing openings from</small>
      <div class="grid-item grid-item-startdate">
        <input 
          type="date"
          id="start-date"
          className="form-control"
          value={startDate}
          onChange={handleStartChange}
        />
      </div>
      <small class="grid-item grid-item-endlabel">to</small>
      <div class="grid-item grid-item-enddate">
        <input 
          type="date"
          id="end-date"
          className="form-control"
          value={endDate}
          onChange={handleEndChange}
        />
      </div>
    </div>
    
  );
}

export default Filter;