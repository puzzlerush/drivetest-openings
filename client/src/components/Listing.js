import React from "react";

var moment = require('moment-timezone');

export default function Listing(props) {
  
  const openingList = props.openings.map(
    function(opening) {
      return (
        <tr id={opening._id}>
          <td scope="col">{opening.location}</td>
          <td>{moment(opening.date).tz("America/New_York").format("LL")}</td>
        </tr>
      );
    }
  );
  
  return (
    <div class="table-wrapper">
      <div class="table-scroll">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {openingList}
          </tbody>
        </table>
      </div>
    </div>
  );
}