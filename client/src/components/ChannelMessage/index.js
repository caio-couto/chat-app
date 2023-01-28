import React from 'react';
import styles from './styles.module.css';
import { FaTrash } from "react-icons/fa";

function ChannelMessage({message}) 
{
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
        <div className={styles.options}>
          <FaTrash/>
        </div>
    </div>
  );
};

export default ChannelMessage;

{/* <div className={styles.invite}>
                <span>Você está sendo chamado para a o servidor {message.inviteInfo.serverName}!</span>
                <span>Venha participar!</span>
                <div className={styles.card}>
                  <strong>Você foi convidado para entrar no servidor</strong>
                  <div className={styles.server_conatainer}>
                    <div className={styles.server_info}>
                      <div className={styles.server_icon}></div>
                      <div className={styles.server_details}>
                        <strong>{message.inviteInfo.serverName}</strong>
                        <div className={styles.server_users}>
                          <div></div>
                          <span>23 membros</span>
                        </div>
                      </div>
                    </div>
                    <button className={styles.button} onClick={(event) => {handleAceptInvite(event, message.inviteInfo.serverId)}}>
                      Juntar-se
                    </button>
                  </div>
                </div> */}