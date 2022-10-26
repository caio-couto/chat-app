import React, { useEffect, useState } from "react";
import UserRow from "../UserRow";
import styles from './styles.module.css';
import { useLocation } from "react-router-dom";

function UserList()
{
    let location = useLocation().pathname.split('/');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [offlineUsers, setOfflineUsers] = useState([]);
    
    useEffect(() =>
    {
        fetch(`http://localhost:5000/server/${location[1]}`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then((resp) => resp.json())
        .then((data) =>
        {
            setOnlineUsers(data.users.filter((element) =>
            {
                return element.status == true;
            }))
            setOfflineUsers(data.users.filter((element) =>
            {
                return element.status == false;
            }))
            
        })
        .catch((error) => console.log(error));
    },[location[1]])

    return(
        <div className={styles.container}>
            <div className={styles.role}>
                Disponível - {onlineUsers.length}
            </div>
            {
                onlineUsers.map((user) =>
                (
                    <UserRow key={user._id} name={user.name}/>
                ))
            }
            <div className={styles.role}>
                Indisponível - {offlineUsers.length}
            </div>
            {
                offlineUsers.map((user) =>
                (
                    <UserRow key={user._id} name={user.name}/>
                ))
            }
        </div>
    );
}

export default UserList;