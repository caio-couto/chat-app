import React from "react";
import styles from './styles.module.css';
import { GoGear, GoPlus } from 'react-icons/go';
import { TbHash } from 'react-icons/tb';

function ChanelButton({ channel, handleClick, isDirect = false })
{
    return(
        <div className={styles.container} onClick={() => {handleClick(channel, isDirect)}}>
            <div>
                {
                    isDirect?
                    <div className={styles.avatar}></div>
                    :
                    <span className={styles.hastag_icon}><TbHash/></span>
                }
                <span>{isDirect? channel.friend.name : channel?.name}</span>
            </div>
            <div>
                <div className={styles.invite_icon}><GoPlus/></div>
                <div className={styles.settings_icon}><GoGear/></div>
            </div>
        </div>
    );
}

export default ChanelButton;