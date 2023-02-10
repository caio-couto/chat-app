import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import styles from './styles.module.css';
import UserContext from "../../context/UserContext";
import DirectList from "../../components/DirectsList";
import UserInfo from "../../components/UserInfo";
import FriendsInfo from "../../components/FriendsInfo";
import { DirectProvider } from "../../context/DirectContext";

function Server()
{
    const { user } = useContext(UserContext);

    return(
        <div className={styles.grid}>
            <DirectProvider>
                <DirectList friends={user?.friends}/>
            </DirectProvider>
            <FriendsInfo friends={user?.friends}/>
            <UserInfo user={user}/>
            <Outlet/>
        </div>    
    );
}

export default Server;