import React from "react";
import styles from './styles.module.css';
import ChanelData from "../ChanelData";

function TertiaryRoutes({ user })
{
    return(
        <div className={styles.channelData_wrapper}>
            <ChanelData user={ user }/>
        </div>
    );
}

export default TertiaryRoutes;