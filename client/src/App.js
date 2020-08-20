import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

var moment = require('moment-timezone');

function getLastUpdated(data) {
  return moment(data["latest_update"]["time_updated"]).tz("America/New_York").format("LLLL");
}

function App() {
  const [data, setData] = useState({"latest_update":{"time_updated":"2020-08-19T01:51:19.983Z","_id":"5f3c859779b1d5696c6c908b"},"all_openings":[]});
  
  const fetchData = async () => {
    const data = await fetch('/api/data').then(res => res.json());
    console.log(data);
    setData(data);
  }
  
  useEffect(() => {
    fetchData()
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {getLastUpdated(data)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
