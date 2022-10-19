import React from "react";
import styles from './styles.module.css';
import ServerList from "../ServerList/index";

function ChanelInfo()
{
    return(
        <div className={styles.container}>
            <span className={styles.hastagIcon}> # </span>
            <h1 className={styles.title}>Chat-livre</h1>
            <div className={styles.separator}/>
            <p className={styles.description}>Descrição do chat</p>
        </div>
    );
}

export default ChanelInfo;