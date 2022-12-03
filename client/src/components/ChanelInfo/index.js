import React, { useState, useEffect, useContext } from "react";
import styles from './styles.module.css';
import { useLocation } from "react-router-dom";
import { TbHash } from 'react-icons/tb';
import { ChannelContext } from "../ChannelContext";

function ChanelInfo({ isDirect = false })
{
    const [channel, setChannel, direct, setDirect, currentChannel, setCurrentChannel, currentDirect, setCurrentDirect] = useContext(ChannelContext);
    const [channelName, setChannelName] = useState('');
    const locate = useLocation().pathname.split('/')[2];
    
    return(
        <div className={styles.container}>
            <span className={styles.hastagIcon}><TbHash/></span>
            <h1 className={styles.title}>
            {
                isDirect?
                <>
                    {currentDirect?.friend.name}
                </>
                :
                <>
                    {currentChannel?.name}
                </>
            }
            </h1>
            <div className={styles.separator}/>
            <p className={styles.description}>Descrição do chat</p>
        </div>
    );
}

export default ChanelInfo;