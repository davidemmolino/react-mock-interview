import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const [ counter, setCounter ] = useState(0);
  const [ userData, setUserData ] = useState('');

  const increaseCounter = () => {
    setCounter(counter + 1)
  };

  const queryString = 'https://randomuser.me/api';

  // fetch data on button click
  const fetchRandomData = async () => {
    try { 
      // Make a request 
      const data = await axios.get(queryString)
      console.log(data);
      setUserData(JSON.stringify(data, null, 2));
    } catch (err) {
      console.log(err)
    }
  };

  // fetch data on page load
  // mimic componentDidMount
  // useEffect(() => {
  //   fetchRandomData();
  // }, []);

  return (
    <div>
      <button onClick={() => increaseCounter()}>Increase counter</button>
      { counter }
      <br/>
      <button onClick={() => fetchRandomData()}>Fetch Random User Data</button>
      <p>{ userData }</p>
    </div>
  );
}

export default App;
