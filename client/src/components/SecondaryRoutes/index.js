import React from "react";
import styles from './styles.module.css';
import ServerName from "../ServerName/index";
import ChanelInfo from "../ChanelInfo";
import ChanelList from "../ChanelList";
import UserInfo from "../UserInfo";
import UserList from "../UserList";
import { Outlet } from 'react-router-dom';

function SecondaryRoutes({ server, user })
{
    return(
        <div className={styles.grid}>
        <ServerName server={server}/>
        <ChanelInfo />
        <ChanelList server={server}/>
        <UserInfo user={user}/>
        <Outlet/>
        <UserList />
        </div>
    );
}

export default SecondaryRoutes;