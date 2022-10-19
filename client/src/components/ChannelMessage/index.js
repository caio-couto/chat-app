import React from 'react';
import styles from './styles.module.css';

function ChannelMessage() 
{
  return (
    <div className={styles.container}>
        <div className={styles.avatar}></div>
        <div className={styles.message}>
            <div className={styles.header}>
                <strong>Caio couto</strong>
                <div className={styles.time}></div>
            </div>
            <div className={styles.content}>oi, tudo bem?</div>
        </div>
    </div>
  );
};

export default ChannelMessage;