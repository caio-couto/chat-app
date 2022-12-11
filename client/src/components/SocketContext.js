import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';

export const SocketContext = createContext();

const location =  window.location.pathname.split('/')[1];
const socketIo = io(`http://localhost:5000/${location}`, {transports: ['websocket'], upgrade: false});

export function SocketProvider({ children })
{
    const [socket, setSocket] = useState(socketIo);

    return (
        <SocketContext.Provider value={[socket, setSocket]}>
            {children}
        </SocketContext.Provider>
    );
}