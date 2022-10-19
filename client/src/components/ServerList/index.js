import React from "react";
import styles from './styles.module.css';
import ServerButton from "../ServerButton/index";

function ServerList()
{
    return(
        <div className={styles.container}>
            <ServerButton isHome={true}/>
            <div className={styles.separator}/>
            <ServerButton/>
            <ServerButton/>
            <ServerButton/>
            <ServerButton/>
            <ServerButton/>
            <ServerButton/>
        </div>
    );
}

export default  ServerList;