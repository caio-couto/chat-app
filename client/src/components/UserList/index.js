import React, { useEffect, useState, useContext } from "react";
import UserRow from "../UserRow";
import styles from './styles.module.css';

function UserList({ users })
{
    const [onlineUsers, setOnlineUsers] = useState(null);
    const [offlineUsers, setOfflineUsers] = useState(null);

    useEffect(() =>
    {
        setOnlineUsers(users?.filter((user) => user.status === true));
        setOfflineUsers(users?.filter((user) => user.status === false));
    }, [users]);

    return(
        <div className={styles.container}>
            <div className={styles.role}>
                Disponível
            </div>
            {
                onlineUsers?.map((user) =>
                (
                    <UserRow key={user._id} userName={user.username}/>
                ))
            }
            <div className={styles.role}>
                Indisponível
            </div>
            {
                offlineUsers?.map((user) =>
                (
                    <UserRow key={user._id} userName={user.username}/>
                ))
            }
        </div>
    );
}

export default UserList;