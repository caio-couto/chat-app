import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.css';
import ChanelButton from "../ChanelButton/index";
import ServerContext from "../../context/ServerContext";

function ChanelList({ serverId })
{
    const { channels } = useContext(ServerContext);

    return(
        <div className={styles.container}>
            <div className={styles.category}>
                <span>Canais de texto</span>
                <div className={styles.add_category}></div>
            </div>  
            {
                channels?.map((channel) =>
                (
                    <Link className={styles.link} key={channel._id}  to={`/channels/${serverId}/${channel._id}`}>
                        <ChanelButton channelName={channel.chatName}/>
                    </Link>
                ))
            }           
        </div>
    );
}

export default ChanelList;