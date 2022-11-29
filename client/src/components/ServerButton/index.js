import React, { useState } from "react";
import styles from './styles.module.css';
import { IoIosAdd } from 'react-icons/io';

function ServerButton({ selected, isHome, hasNotifications, mentions, isServerAdd, handleClick })
{
    function onHandleClick()
    {
        if(handleClick)
        {
            handleClick();
        }
    }
    return(
        <div onClick={() => {onHandleClick()}} className={styles.button}>
            {isHome && <img src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-0.png" alt="logo"/>}
            {isServerAdd && <div><IoIosAdd/></div> }
        </div>
    );
}

export default ServerButton;