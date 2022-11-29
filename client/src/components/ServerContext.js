import React, { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

export const ServerContext = createContext();

export function ServerProvider({ children })
{
    const [server, setServer] = useState({}); 

    return(
        <ServerContext.Provider value={[server, setServer]}>
            {children}
        </ServerContext.Provider>
    )
}