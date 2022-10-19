import React from "react";
import styles from './styles.module.css';

function ServerButton({ selected, isHome, hasNotifications, mentions })
{
    return(
        <div className={styles.button}>
            {isHome && <img src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-0.png" alt="logo"/>}
        </div>
    );
}

export default ServerButton;