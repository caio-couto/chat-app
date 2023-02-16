import React from "react";
import styles from './styles.module.css';

function DirectButton({ directName, src })
{
    return(
        <div className={styles.container}>
            <div>
                <div className={styles.profile}>
                    {
                        src !== 'none' && src &&
                            <img className={styles.profile_pic} src={`http://localhost:5000/api/uploads/images/user/${src.split('/')[4]}`} />
                    }
                </div>
                <span>{directName}</span>
            </div>
        </div>
    );
}

export default DirectButton;