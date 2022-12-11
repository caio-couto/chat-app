import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ServerContext } from "./ServerContext";
import { UserContext } from "./UserContext";

export const ChannelContext = createContext();

export function ChannelProvider({ children })
{
    const [servers, setServers, server, setServer, getServer, updateServer] = useContext(ServerContext);
    const [user] = useContext(UserContext);
    const [direct, setDirect] = useState(null);
    const [channels, setChannels] = useState(null);
    const [current, setCurrent] = useState(null);

    useEffect(() =>
    {
        setDirect(user?.friends);
        setChannels(server?.channels);
    }, [server, user]);

    return(
        <ChannelContext.Provider value={[channels, setChannels, direct, setDirect, current, setCurrent]}>
            {children}
        </ChannelContext.Provider>
    );
}