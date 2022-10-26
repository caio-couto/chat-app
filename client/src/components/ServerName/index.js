import React from "react";
import styles from './styles.module.css';

function ServerName({ server })
{
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                {server.name}
            </h1>
            <div className={styles.expand_icon}/>
        </div>
    );
}

export default ServerName;