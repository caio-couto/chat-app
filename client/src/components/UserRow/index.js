import React from "react";
import styles from './styles.module.css';

function UserRow({ userName })
{
    return(
        <div className={styles.container}>
            <div className={styles.avatar}></div>
            <strong>{ userName }</strong>
        </div>
    );
}

export default UserRow;