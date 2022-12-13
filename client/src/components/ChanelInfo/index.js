import React, { useState, useEffect, useContext } from "react";
import styles from './styles.module.css';
import { useLocation } from "react-router-dom";
import { TbHash } from 'react-icons/tb';
import { FiAtSign } from 'react-icons/fi';
import { ChannelContext } from "../ChannelContext";
import { BsFillPeopleFill } from 'react-icons/bs';

function ChanelInfo({ isDirect = false })
{
    const [channels, setChannels, direct, setDirect, current, setCurrent] = useContext(ChannelContext);
    const [channelName, setChannelName] = useState('');
    const locate = useLocation().pathname.split('/')[2];


    
    return(
        <div className={styles.container}>
            {
                locate == 'friends'?
                <>
                    <div className={styles.friends}>
                        <span className={styles.friends_icon}><BsFillPeopleFill/></span>
                        <p>Amigos</p>
                    </div>
                    <div className={styles.separator}/>
                    <div className={styles.friends_button}>
                        <span>Disponível</span>
                    </div>
                    <div className={styles.friends_button}>
                        <span>Todos</span>
                    </div>
                </>
                :
                <>
                    <span className={styles.hastagIcon}>{isDirect? <FiAtSign/> : <TbHash/>}</span>
                    <h1 className={styles.title}>
                    bosta
                    </h1>
                    {
                        !isDirect&&
                        <>
                            <div className={styles.separator}/>
                            <p className={styles.description}>Descrição do chat</p>
                        </>
                    }
                </>
            }

        </div>
    );
}

export default ChanelInfo;