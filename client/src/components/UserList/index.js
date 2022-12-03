import React, { useEffect, useState, useContext } from "react";
import UserRow from "../UserRow";
import styles from './styles.module.css';
import { ServerContext } from "../ServerContext";
import { useLocation } from "react-router-dom";

function UserList({ server })
{
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [offlineUsers, setOfflineUsers] = useState([]);

    useEffect(() =>
    {
        if(server)
        {
            setOnlineUsers(server.users.filter((user) => user.status == true ));
            setOfflineUsers(server.users.filter((user) => user.status == false));
        }
    }, [server]);

    return(
        <div className={styles.container}>
            <div className={styles.role}>
                Disponível - {onlineUsers?.length}
            </div>
            {
                onlineUsers.map((user, index) =>
                {
                    if(user.status)
                    {
                        return <UserRow key={index} name={user.name}/>
                    }
                })
            }
            <div className={styles.role}>
                Indisponível - {offlineUsers?.length}
            </div>
            {
                offlineUsers.map((user, index) =>
                {
                    if(!user.status)
                    {
                        return <UserRow key={index} name={user.name}/>
                    }
                })
            }
        </div>
    );
}

export default UserList;