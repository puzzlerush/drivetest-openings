import React, { useEffect, useState } from 'react';
import Listing from "./components/Listing";
import Header from "./components/Header";
import Filter from "./components/Filter";

var moment = require('moment-timezone');

function getLastUpdated(data) {
  return moment(data["latest_update"]["time_updated"]).tz("America/New_York").format("LLLL");
}

function getOpenings(data) {
  return data["all_openings"];
}

function App() {
  const [data, setData] = useState({"latest_update":{"time_updated":"2020-08-11T01:51:19.983Z","_id":"5f3c859779b1d5696c6c908b"},"all_openings":[]});
  
  const fetchData = async () => {
    const data = await fetch('/api/data').then(res => res.json());
    console.log(data);
    setData(data);
  }
  
  useEffect(() => {
    fetchData()
  }, []);
  
  return (
    <div className="container">
      <Header/>
      <Filter />
      <Listing openings={getOpenings(data)} />
      <small class="footer text-muted m-4">
        Last updated {getLastUpdated(data)}
      </small>
    </div>
  );
}

export default App;
