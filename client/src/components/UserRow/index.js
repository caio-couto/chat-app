import React from "react";
import styles from './styles.module.css';

function UserRow({ name })
{
    return(
        <div className={styles.container}>
            <div className={styles.avatar}></div>
            <strong>{ name }</strong>
        </div>
    );
}

export default UserRow;