import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import ServerList from "../ServerList";
import SecondaryRoutes from '../SecondaryRoutes';
import TertiaryRoutes from '../TertiaryRoutes';
import styles from './styles.module.css';
import { SocketioContext } from '../SocketioContext';

function Layout() 
{
  const [user, setUser] = useState({});

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  useEffect(() =>
  {
    fetch(`http://localhost:5000/user/${getRandomArbitrary(0, 2) == 1? '63503c4c34476e0fd0f79007' : '63503e6c6e687d8b1b7c4e89'}`, 
    {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    },)
    .then((resp) => resp.json())
    .then((data) =>
    {
      setUser(data);
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <div className={styles.main}>
        <ServerList servers={user.servers} userId={user._id}/>
        <Routes>
          <Route path='/:id' element={<SecondaryRoutes user={user}/>}>
            <Route path='/:id/:id' element={<TertiaryRoutes user={user}/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Layout;