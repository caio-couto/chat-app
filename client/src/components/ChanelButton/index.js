import React from "react";
import styles from './styles.module.css';

function ChanelButton()
{
    return(
        <div className={styles.container}>
            <div>
                <span className={styles.hastag_icon}>#</span>
                <span>Chanel name</span>
            </div>
            <div>
                <div className={styles.invite_icon}>+</div>
                <div className={styles.settings_icon}>o</div>
            </div>
        </div>
    );
}

export default ChanelButton;