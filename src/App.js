import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  const [ counter, setCounter ] = useState(0);

  const increaseCounter = () => {
    setCounter(counter + 1)
  };

  return (
    <div>
      <button onClick={() => increaseCounter()}>Increase counter</button>
      { counter }
    </div>
  );
}

export default App;
