import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserContext";

export const ServerContext = createContext();

export function ServerProvider({ children })
{
    const [user, setUser] = useContext(UserContext);
    const [servers, setServers] = useState(null); 
    const [server, setServer] = useState(null);

    useEffect(() =>
    {
        if(user)
        {
            fetch(`http://localhost:5000/server/user/${user._id}`)
            .then((resp) => resp.json())
            .then((userServers) =>
            {
                setServers(userServers);
            })
            .catch((error) => console.log(error));
        }
    }, []);

    function getServer(id)
    {
        fetch(`http://localhost:5000/server/${id}`)
        .then((resp) => resp.json())
        .then((userServer) =>
        {
            setServer(userServer);
        })
        .catch((error) => console.log(error));
    }

    return(
        <ServerContext.Provider value={[servers, setServers, server, setServer, getServer]}>
            {children}
        </ServerContext.Provider>
    )
}