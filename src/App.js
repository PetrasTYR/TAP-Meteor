import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import { useQuery } from '@tanstack/react-query'
import govtAPI from './api/govtAPI';

function App() {
  // * test react-query
  const { data: trafficData, error: getTrafficDataError } = useQuery(
    ['trafficData', '2021-01-01T00:00:00'],
    async () => {
      const { data } = await govtAPI.getTrafficImage('2021-01-01T00:00:00');
      return data;
    }
  )

  if (getTrafficDataError) {
    console.log('error');
    console.log(getTrafficDataError);
  }

  useEffect(() => {
    if (trafficData) {
      console.log(trafficData);
    }
  }, [trafficData])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
