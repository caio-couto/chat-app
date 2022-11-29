import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Link, redirect } from "react-router-dom";
import styles from './styles.module.css';
import ChanelButton from "../ChanelButton/index";
import { SocketioContext } from "../SocketioContext";

function ChanelList()
{
    let location = useLocation().pathname.split('/');
    const [Channels, setChannels] = useState([]);
    const [socket, setSocket] = useContext(SocketioContext);

    function getChannels()
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
    }
    
    useEffect(() =>
    {
        getChannels();
    },[location[1]]);

    useEffect(() =>
    {
        socket.on('new-channel', () =>
        {
            getChannels();
        });
    }, [socket]);

    function handleClick(event)
    {
        socket?.emit('join-room', location[2])
    }

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
                        <ChanelButton name={channel.name} handleClick={handleClick}/>
                    </Link>
                ))
            }
        </div>
    );
}

export default ChanelList;