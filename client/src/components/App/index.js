import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import { UserProvider } from "../UserContext";
import { SocketProvider }  from '../SocketContext';
import { ServerProvider } from "../ServerContext";
import ServerList from "../ServerList";
import SecondaryRoutes from '../SecondaryRoutes';
import TertiaryRoutes from '../TertiaryRoutes';
import styles from './styles.module.css';

function Layout() 
{

  return (
    <Router>
      <UserProvider>
        <ServerProvider>
          <SocketProvider>
              <div className={styles.main}>
                <ServerList/>
                <Routes>
                  <Route path='/' element={<Navigate to='/direct'/>}/>
                  <Route path='/direct' element={<SecondaryRoutes isDirect={true}/>}>
                    <Route path='/direct/:id' element={<TertiaryRoutes/>}/>
                  </Route>
                  <Route path='/:id' element={<SecondaryRoutes isDirect={false}/>}>
                    <Route path='/:id/:id' element={<TertiaryRoutes/>}/>
                  </Route>
                </Routes>
              </div>
          </SocketProvider>
        </ServerProvider>
      </UserProvider>
    </Router>
  );
}

export default Layout;