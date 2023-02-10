import React, { useContext } from 'react';
import styles from './styles.module.css';
import { FaTrash } from "react-icons/fa";
import ChatContext from '../../context/ChatContext';

function ChannelMessage({message}) 
{
  const { deleteMessage } =  useContext(ChatContext);

  function handleDeleteMessage(event)
  {
    event.preventDefault();
    deleteMessage(message._id);
  }

  return (
    <div className={styles.container}>
        <div className={styles.avatar}></div>
        <div className={styles.message}>
            <div className={styles.header}>
                <strong>{message.sender.username}</strong>
                <div className={styles.time}>{message.createdAt}</div>
            </div>
            <div className={styles.content}>
            {message.content}
            </div>
        </div>
        <div onClick={(event) => handleDeleteMessage(event)} className={styles.options}>
          <FaTrash/>
        </div>
    </div>
  );
};

export default ChannelMessage;