import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';

export const SocketContext = createContext();

export function SocketProvider({ children })
{
    const [socket, setSocket] = useState(null);
    const location =  useLocation().pathname.split('/')[1];

    useEffect(() =>
    {   
        const socketIo = location != ''? io(`http://localhost:5000/${location}`, {transports: ['websocket'], upgrade: false}) : null;
        setSocket(socketIo);
    }, [location]);

    return (
        <SocketContext.Provider value={[socket, setSocket]}>
            {children}
        </SocketContext.Provider>
    );
}