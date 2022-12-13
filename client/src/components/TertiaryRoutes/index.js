import React, { useState, useEffect, useContext } from "react";
import styles from './styles.module.css';
import ChanelData from "../ChanelData";
import { UserContext } from '../UserContext';

function TertiaryRoutes()
{   
    const [user, setUser] = useContext(UserContext);
    return(
        <div className={styles.channelData_wrapper}>
            <ChanelData user={user} setUser={setUser}/>
        </div>
    );
}

export default TertiaryRoutes;