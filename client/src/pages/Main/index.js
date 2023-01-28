import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { UserProvider } from "../../context/UserContext";
import ServerList from "../../components/ServerList";
import { Outlet } from "react-router-dom";
import { ServerProvider } from "../../context/ServerContext";
import styles from './styles.module.css';

function Main()
{
    const { user, logout } = useContext(AuthContext);
    
    return(
        <div className={styles.main}>
            <UserProvider>
                <ServerProvider>
                    <ServerList/>
                    <Outlet/>
                </ServerProvider>
            </UserProvider>
        </div>
                
    );
}

export default Main;