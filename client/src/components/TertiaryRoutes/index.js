import React, { useState, useEffect, useContext } from "react";
import styles from './styles.module.css';
import ChanelData from "../ChanelData";
import { UserContext } from '../UserContext';

function TertiaryRoutes()
{   
    const [user] = useContext(UserContext);
    return(
        <div className={styles.channelData_wrapper}>
            <ChanelData user={user}/>
        </div>
    );
}

export default TertiaryRoutes;