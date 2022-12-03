import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import ServerList from "../ServerList";
import SecondaryRoutes from '../SecondaryRoutes';
import TertiaryRoutes from '../TertiaryRoutes';
import styles from './styles.module.css';
import { SocketioContext } from '../SocketContext';

function Layout() 
{

  return (
    <Router>
      <div className={styles.main}>
        <ServerList/>
        <Routes>
          <Route path='/direct' element={<SecondaryRoutes isDirect={true}/>}>
            <Route path='/direct/:id' element={<TertiaryRoutes/>}/>
          </Route>
          <Route path='/:id' element={<SecondaryRoutes isDirect={false}/>}>
            <Route path='/:id/:id' element={<TertiaryRoutes/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Layout;