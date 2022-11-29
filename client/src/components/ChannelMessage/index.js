import React from 'react';
import styles from './styles.module.css';
import { FaTrash } from "react-icons/fa";

function ChannelMessage({ message, handleClick, previousMessage }) 
{
  return (
    <div className={styles.container}>
        {previousMessage?.sender._id != message.sender._id || previousMessage == undefined &&
          <div className={styles.avatar}></div>
        }
        <div className={styles.message}>
            <div className={styles.header}>
                <strong>{message.sender.name}</strong>
                <div className={styles.time}></div>
            </div>
            <div className={styles.content}>{ message.content }</div>
        </div>
        <div className={styles.options} onClick={() => {handleClick(message._id)}}>
          <FaTrash/>
        </div>
    </div>
  );
};

export default ChannelMessage;