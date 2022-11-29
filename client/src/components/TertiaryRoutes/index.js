import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import ChanelData from "../ChanelData";
import { useOutletContext } from "react-router-dom";

function TertiaryRoutes({ user })
{   

    return(
        <div className={styles.channelData_wrapper}>
            <ChanelData user={user}/>
        </div>
    );
}

export default TertiaryRoutes;