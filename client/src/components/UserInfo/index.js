import React from "react";
import styles from './styles.module.css';
import { GoGear } from 'react-icons/go';

function UserInfo({ user })
{
    return(
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.avatar}></div>
                <div className={styles.user_data}>
                    <strong>{user.name}</strong>
                    <span>#2278</span>
                </div>
            </div>
            <div className={styles.icons}>
                <div className={styles.settings_icon}><GoGear/></div>
            </div>
        </div>
    );
}

export default UserInfo;