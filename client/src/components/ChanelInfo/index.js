import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import { useLocation } from "react-router-dom";
import { TbHash } from 'react-icons/tb';

function ChanelInfo()
{
    let location = useLocation().pathname.split('/');
    const [channel, setChannels] = useState({});
    
    useEffect(() =>
    {
        fetch(`http://localhost:5000/channel/${location[2]}`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then((resp) => resp.json())
        .then((data) =>
        {
            setChannels(data);
        })
        .catch((error) => console.log(error));
    },[location[2]])

    return(
        <div className={styles.container}>
            <span className={styles.hastagIcon}><TbHash/></span>
            <h1 className={styles.title}>{channel.name}</h1>
            <div className={styles.separator}/>
            <p className={styles.description}>Descrição do chat</p>
        </div>
    );
}

export default ChanelInfo;