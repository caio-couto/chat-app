import React, { createContext, useContext, useEffect, useState } from "react";
import { ServerContext } from "./ServerContext";
import { UserContext } from "./UserContext";

export const ChannelContext = createContext();

export function ChannelProvider({ children })
{
    const [channel, setChannel] = useState(null);
    const [direct, setDirect] = useState(null);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [currentDirect, setCurrentDirect] = useState(null);

    const [servers, setServers, server, setServer, getServer, updateServer] = useContext(ServerContext);
    const [user] = useContext(UserContext);

    useEffect(() =>
    {
        updateChannel();
    }, [server, user, channel]);

    function updateChannel()
    {
        setChannel(server?.channels);
        setDirect(user?.friends);
    }

    return(
        <ChannelContext.Provider value={[channel, setChannel, direct, setDirect, currentChannel, setCurrentChannel, currentDirect, setCurrentDirect, updateChannel]}>
            {children}
        </ChannelContext.Provider>
    );
}