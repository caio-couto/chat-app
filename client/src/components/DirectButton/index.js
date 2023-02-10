import React from "react";
import styles from './styles.module.css';

function DirectButton({ directName })
{
    return(
        <div className={styles.container}>
            <div>
                <div className={styles.profile}></div>
                <span>{directName}</span>
            </div>
        </div>
    );
}

export default DirectButton;