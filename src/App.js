import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const [ counter, setCounter ] = useState(0);
  const [ userData, setUserData ] = useState('');
  const [ userInfo, setUserInfo ] = useState([]);
  const [ nextPage, setNextPage ] = useState(1);

  const increaseCounter = () => {
    setCounter(counter + 1)
  };

  const fetchNextUser = () => {
    fetchRandomData(nextPage).then(randomData => {
      if (randomData === undefined) return;
      const newUserInfo = [
        ...userInfo, 
        ...randomData.results 
      ];
      setUserInfo(newUserInfo);
      setNextPage(randomData.info.page + 1);
    });
  }
  // fetch data on button click
  const fetchRandomData = async (number = nextPage) => {
    try { 
      // Make a request 
      const {data} = await axios.get(`https://randomuser.me/api?page=${number}`)
      // setUserData(JSON.stringify(data, null, 2));
      return data;
    } catch (err) {
      console.log(err)
    }
  };

  // constructor function to get full name of user
  const getFullName = (user) => {
    const { name: { first, last}} = user;
    return `${first} ${last}`;
  };

  // fetch data on page load
  // mimic componentDidMount
  useEffect(() => {
    fetchNextUser();
  }, []);

  return (
    <div>
      <button onClick={() => increaseCounter()}>Increase counter</button>
      { counter }
      <br/>
      <button onClick={() => fetchRandomData()}>Fetch Random User Data</button>
      <button onClick={ fetchNextUser }>Get next user</button>
      <p>{ userData }</p>
      { userInfo.map((user, i) => (
        <div key={`${user}_${i}`}>
            <p>{getFullName(user)}</p>
            <img src={`${user.picture.thumbnail}`} alt={`${user.first}'s profile`} />
        </div>
      )) }
    </div>
  );
}

export default App;
