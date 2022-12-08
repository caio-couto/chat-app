import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Link, redirect } from "react-router-dom";
import styles from './styles.module.css';
import ChanelButton from "../ChanelButton/index";
import { ChannelContext } from "../ChannelContext";

function ChanelList({ user, isDirect = false, server, socket, updateServer })
{
    const [channel, setChannel, direct, setDirect, currentChannel, setCurrentChannel, currentDirect, setCurrentDirect, updateChannel] = useContext(ChannelContext);
    const locate = useLocation().pathname.split('/')[1];
    const [lsitChannel, setListChannel] = useState([]);

    function handleClick(currentChannel, isDirect)
    {
        if(isDirect)
        {
            setCurrentDirect(currentChannel);
        }
        else
        {
            setCurrentChannel(currentChannel);
        }
    }

    useEffect(() =>
    {
        setListChannel(channel);
    }, [locate, channel]);

    useEffect(() =>
    {
        socket?.on('new-channel', ({newChannel}) =>
        {
            setListChannel(arr => [...arr, newChannel]);
        });

        return () =>
        {
            socket?.off('new-channel');
        }
    }, []);

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
                        <ChanelButton channel={channel} isDirect={true} handleClick={handleClick}/>
                    </Link>
                ))
                :
                lsitChannel?.map((channel, index) =>
                (
                    <Link key={index} to={channel._id}>
                        <ChanelButton channel={channel} handleClick={handleClick}/>
                    </Link>
                ))
            }
        </div>
    );
}

export default ChanelList;