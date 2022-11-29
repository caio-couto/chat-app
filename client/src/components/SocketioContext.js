import React, { createContext, useEffect, useState } from "react";
import io from 'socket.io-client';

export const SocketioContext = createContext();

let socketio = {}; 

function defineSocket()
{
    socketio = io(`http://localhost:5000/${window.location.pathname.split('/')[1]}`);
}


defineSocket();

export function SocketioProvider({ children, userId })
{
    const [socket, setSocket] = useState(socketio);

    return (
        <SocketioContext.Provider value={[socket, setSocket, defineSocket]}>
            {children}
        </SocketioContext.Provider>
    );
}