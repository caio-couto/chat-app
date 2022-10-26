import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, redirect } from "react-router-dom";
import styles from './styles.module.css';
import ChanelButton from "../ChanelButton/index";

function ChanelList({ server })
{
    let location = useLocation().pathname.split('/');
    const [Channels, setChannels] = useState([]);
    
    useEffect(() =>
    {
        fetch(`http://localhost:5000/channel/server/${location[1]}`,
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
    },[location[1]]);

    return(
        <div className={styles.container}>
            <div className={styles.category}>
                <span>Canais de texto</span>
                <div className={styles.add_category}></div>
            </div>
            {
                Channels.map((channel) =>
                (
                    <Link key={channel._id} to={channel._id}>
                        <ChanelButton name={channel.name}/>
                    </Link>
                ))
            }
        </div>
    );
}

export default ChanelList;