import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import ServerName from "../ServerName/index";
import ChanelInfo from "../ChanelInfo";
import ChanelList from "../ChanelList";
import UserInfo from "../UserInfo";
import UserList from "../UserList";
import { Outlet, useLocation } from 'react-router-dom';
import { ServerProvider } from "../ServerContext";
import { SocketioContext } from '../SocketioContext';

function SecondaryRoutes({ user })
{
    const [socket, setSocket, defineSocket] = useContext(SocketioContext);

    useEffect(() =>
    {
        defineSocket();
    }, [])

    return(
        <div className={styles.grid}>
            <ServerProvider>
                <UserList />
                <ServerName/>
            </ServerProvider>
            <ChanelList/>
            <ChanelInfo />
            <UserInfo user={user}/>
            <Outlet/>
        </div>
    );
}

export default SecondaryRoutes;