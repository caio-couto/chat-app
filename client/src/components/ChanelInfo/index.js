import React, { useState, useEffect, useContext } from "react";
import styles from './styles.module.css';
import { TbHash } from 'react-icons/tb';
import { FiAtSign } from 'react-icons/fi';
import { BsFillPeopleFill } from 'react-icons/bs';

function ChanelInfo()
{
    return(
        <div className={styles.container}>
            <span className={styles.hastagIcon}><TbHash/></span>
            <h1 className={styles.title}> bosta </h1>
            <div className={styles.separator}/>
            <p className={styles.description}>Descrição do chat</p>
        </div>
    );
}

export default ChanelInfo;