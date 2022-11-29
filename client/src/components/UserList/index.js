import React, { useEffect, useState, useContext } from "react";
import UserRow from "../UserRow";
import styles from './styles.module.css';
import { ServerContext } from "../ServerContext";
import { useLocation } from "react-router-dom";

function UserList()
{
    const [server, setServer] = useContext(ServerContext);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [offlineUsers, setOfflineUsers] = useState([]);
    const location = useLocation().pathname.split('/');
    
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
            setServer(data)
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