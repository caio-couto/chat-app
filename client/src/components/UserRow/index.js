import React from "react";
import styles from './styles.module.css';
import ServerList from "../ServerList/index";

function UserRow()
{
    return(
        <div className={styles.container}>
            <div className={styles.avatar}></div>
            <strong>User name</strong>
        </div>
    );
}

export default UserRow;