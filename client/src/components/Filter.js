import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
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
  
  return (
    <div class="form-wrapper">
      <input
        type="text"
        id="filter-input"
        className=""
        placeholder="Search for a location"
        onChange={handleFilterChange}
      />
      <input 
        type="date"
        id="start-date"
        className=""
        value={props.startDate.format('YYYY-MM-DD')}
        onChange={handleStartChange}
      />
      <input 
        type="date"
        id="end-date"
        className=""
        value={props.endDate.format('YYYY-MM-DD')}
        onChange={handleEndChange}
      />
    </div>
    
  );
}

export default Filter;