import React from "react";
import styles from './styles.module.css';

function UserRow({ user })
{
    return(
        <div className={styles.container}>
            <div className={styles.avatar}>
                {
                    user.profilePic != 'none'&&
                        <img className={styles.profile_pic} src={`http://localhost:5000/api/uploads/images/user/${user?.profilePic.split('/')[4]}`} />
                }
            </div>
            <strong>{ user.username }</strong>
        </div>
    );
}

export default UserRow;