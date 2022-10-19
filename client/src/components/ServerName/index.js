import React from "react";
import styles from './styles.module.css';
import ServerList from "../ServerList/index";

function ServerName()
{
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                Servidor
            </h1>
            <div className={styles.expand_icon}/>
        </div>
    );
}

export default ServerName;