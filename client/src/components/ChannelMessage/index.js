import React from 'react';
import styles from './styles.module.css';

function ChannelMessage({ message }) 
{
  return (
    <div className={styles.container}>
        <div className={styles.avatar}></div>
        <div className={styles.message}>
            <div className={styles.header}>
                <strong>{message.sender.name}</strong>
                <div className={styles.time}></div>
            </div>
            <div className={styles.content}>{ message.content }</div>
        </div>
    </div>
  );
};

export default ChannelMessage;