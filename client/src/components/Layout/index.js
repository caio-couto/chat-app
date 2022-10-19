import React from "react";
import styles from './styles.module.css';
import ServerName from "../ServerName/index";
import ChanelInfo from "../ChanelInfo";
import ChanelList from "../ChanelList";
import UserInfo from "../UserInfo";
import UserList from "../UserList";
import ServerList from "../ServerList";
import ChanelData from "../ChanelData";

function Layout ()
{
    return(
        <div className={styles.grid}>
            <ServerList/>
            <ServerName />
            <ChanelInfo />
            <ChanelList />
            <UserInfo />
            <ChanelData />
            <UserList />
        </div>
    );
}

export default Layout;