import React from "react";

var moment = require('moment-timezone');

export default function Listing(props) {
  
  const openingList = props.openings.map(
    function(opening) {
      return (
        <tr id={opening._id} key={opening._id}>
          <td scope="col">{opening.location}</td>
          <td>{moment(opening.date).utc().format("LL")}</td>
        </tr>
      );
    }
  );
  
  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="table table-hover">
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