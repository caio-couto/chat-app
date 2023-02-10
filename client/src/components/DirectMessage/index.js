import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { FaTrash } from "react-icons/fa";
import ChatContext from '../../context/ChatContext';
import UserContext from '../../context/UserContext';
import ServerContext from '../../context/ServerContext';

function DirectMessage({message}) 
{
  const { inviteServer } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const { joinServer } = useContext(ServerContext);
  const [server, setServer] = useState(null);

  useEffect(() =>
  {
    if(message.isInvite)
    {
      inviteServer(message.content)
      .then((res) =>
      {
        setServer(res);
      })
    }
  }, []);

  function handleClick(event)
  {
    event.preventDefault();
    if(!(server?.users.includes(user._id))) 
    {
      joinServer(server?._id, user?._id);
    }
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
            {
              !message.isInvite ? 
                message.content
              :
              (
                <div className={styles.invite}>
                  <span>Você está sendo chamado para a o servidor {server?.name}!</span>
                  <span>Venha participar!</span>
                  <div className={styles.card}>
                    <strong>Você foi convidado para entrar no servidor</strong>
                    <div className={styles.server_conatainer}>
                      <div className={styles.server_info}>
                        <div className={styles.server_icon}></div>
                        <div className={styles.server_details}>
                          <strong>{server?.name}</strong>
                          <div className={styles.server_users}>
                            <div></div>
                            <span>{server?.users?.length}</span>
                          </div>
                        </div>
                      </div>
                      <button className={styles.button} disabled={server?.users.includes(user._id) ? true : false} onClick={(event) => handleClick(event)}>
                      {
                        server?.users.includes(user._id) ? 'Juntou-se' : 'Juntar-se'
                      }
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
            </div>
        </div>
        <div className={styles.options}>
          <FaTrash/>
        </div>
    </div>
  );
};

export default DirectMessage;