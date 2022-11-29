import React from "react";
import styles from './styles.module.css';
import { GoGear, GoPlus } from 'react-icons/go';
import { TbHash } from 'react-icons/tb';

function ChanelButton({ name, handleClick })
{
    return(
        <div className={styles.container} onClick={(event) => {handleClick(event)}}>
            <div>
                <span className={styles.hastag_icon}><TbHash/></span>
                <span>{name}</span>
            </div>
            <div>
                <div className={styles.invite_icon}><GoPlus/></div>
                <div className={styles.settings_icon}><GoGear/></div>
            </div>
        </div>
    );
}

export default ChanelButton;