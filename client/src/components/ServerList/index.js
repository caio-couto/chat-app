import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import styles from './styles.module.css';
import ServerButton from "../ServerButton/index";

function ServerList({ servers })
{
    return(
        <div className={styles.container}>
            <ServerButton isHome={true}/>
            <div className={styles.separator}/>
            {
                servers.map((server) =>
                (
                    <Link key={server._id} to={`${server._id}/${server.channels[0]}`}>
                        <ServerButton/>
                    </Link>
                ))
            }
        </div>
    );
}

export default  ServerList;