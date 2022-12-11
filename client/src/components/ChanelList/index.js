import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.css';
import ChanelButton from "../ChanelButton/index";
import { ChannelContext } from "../ChannelContext";

function ChanelList({ isDirect = false, socket})
{
    const [channels, setChannels, direct, setDirect, current, setCurrent] = useContext(ChannelContext);

    useEffect(() =>
    {
        socket?.on('new-channel', ({newChannel}) =>
        {
            setChannels(arr => [...arr, newChannel]);
        });

        return () =>
        {
            socket?.off('new-channel');
        }
    }, []);

    function handleChangeCurrent(channel)
    {
        setCurrent(channel);
    }

    return(
        <div className={styles.container}>
            <div className={styles.category}>
                <span>{isDirect ? 'Mensagens diretas' : 'Canais de texto'}</span>
                <div className={styles.add_category}></div>
            </div>
            {
                isDirect?                 
                direct?.map((channel, index) =>
                (
                    <Link key={index} to={channel.direct}>
                        <ChanelButton channel={channel} isDirect={true} handleChangeCurrent={handleChangeCurrent}/>
                    </Link>
                ))
                :
                channels?.map((channel, index) =>
                (
                    <Link key={index} to={channel._id}>
                        <ChanelButton channel={channel} handleChangeCurrent={handleChangeCurrent}/>
                    </Link>
                ))
            }
        </div>
    );
}

export default ChanelList;