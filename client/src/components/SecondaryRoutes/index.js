import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import ServerName from "../ServerName/index";
import ChanelInfo from "../ChanelInfo";
import ChanelList from "../ChanelList";
import UserInfo from "../UserInfo";
import UserList from "../UserList";
import { Outlet, useLocation } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { ServerContext } from "../ServerContext";
import { ChannelProvider } from "../ChannelContext";
import { SocketContext } from "../SocketContext";

function SecondaryRoutes({ isDirect = false })
{
    const [user] = useContext(UserContext);
    const [socket, setSocket, defineSocket] = useContext(SocketContext);
    const [servers, setServers, server, setServer, getServer, updateServer] = useContext(ServerContext);
    const locate = useLocation().pathname.split('/')[1];

    useEffect(() =>
    {
        if(locate != 'direct')
        {
            getServer(locate);
        }
    }, [locate]);

    return(
        <div className={isDirect? `${styles.grid} ${styles.direct}` : styles.grid}>
            <ChannelProvider>
                {
                    isDirect? 
                    <>
                        <ServerName isDirect={true} socket={socket}/>
                        <ChanelList socket={socket} isDirect={true}/>
                        <ChanelInfo isDirect={true}/>
                    </>
                    :
                    <>
                        <UserList server={server}/>
                        <ServerName server={server} socket={socket}/>
                        <ChanelList socket={socket} server={server}/>
                        <ChanelInfo/>
                    </>
                }
                <UserInfo user={user}/>
                <Outlet/>
            </ChannelProvider>
        </div>
    );
}

export default SecondaryRoutes;