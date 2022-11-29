import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import { ServerContext } from "../ServerContext";

function ServerName()
{
    const [server, setServer] = useContext(ServerContext);
    const [name, setName] = useState('');

    useEffect(() =>
    {
        setName(server.name)
    },[server])

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                {name}
            </h1>
            <div className={styles.expand_icon}/>
        </div>
    );
}

export default ServerName;