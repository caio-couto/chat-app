import React, { useContext, useEffect, useState } from "react";
import { SocketioProvider }  from './components/SocketioContext';
import Layout from './components/layout';

function App() 
{
  return (
    <SocketioProvider>
      <Layout/>
    </SocketioProvider>
  );
}

export default App;
