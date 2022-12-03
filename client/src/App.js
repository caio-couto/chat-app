import React, { useContext, useEffect, useState } from "react";
import { UserProvider } from "./components/UserContext";
import { SocketProvider }  from './components/SocketContext';
import { ServerProvider } from "./components/ServerContext";
import Layout from './components/layout';

function App() 
{
  return (
    <UserProvider>
      <ServerProvider>
        <SocketProvider >
          <Layout/>
        </SocketProvider>
      </ServerProvider>
    </UserProvider>
  );
}

export default App;
