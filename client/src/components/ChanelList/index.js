import React from "react";
import styles from './styles.module.css';
import ChanelButton from "../ChanelButton/index";

function ChanelList()
{
    return(
        <div className={styles.container}>
            <div className={styles.category}>
                <span>Canais de texto</span>
                <div className={styles.add_category}></div>
            </div>
            <ChanelButton />
        </div>
    );
}

export default ChanelList;