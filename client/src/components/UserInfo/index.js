import React from "react";
import styles from './styles.module.css';
import ServerList from "../ServerList/index";

function UserInfo()
{
    return(
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.avatar}></div>
                <div className={styles.user_data}>
                    <strong>User name</strong>
                    <span>#2278</span>
                </div>
            </div>
            <div className={styles.icons}>
                <div className={styles.settings_icon}>o</div>
            </div>
        </div>
    );
}

export default UserInfo;