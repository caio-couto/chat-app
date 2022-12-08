import React, { useRef, useEffect, useState, useContext } from 'react';
import ChannelMessage from '../ChannelMessage';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { SocketContext } from '../SocketContext';

function ChanelData({ user })
{
  const locate = useLocation().pathname.split('/')[2];
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useContext(SocketContext);
  
  useEffect(() =>
  {
    socket?.emit('join-room', {locate});
    socket?.on('room-connection', (message) =>
    {
      console.log(message);
    });
 
    return () =>
    {
      socket?.off('room-connection');
      socket?.off('join-room');
    }
  }, [locate]);

  useEffect(() =>
  {

    socket?.on('history', (history)=>
    {
      setMessages(history);
    })

    socket?.on('server-message', (data) =>
    {
      setMessages(arr => [...arr, data]);
    });

    return () =>
    {
      socket?.off('server-message');
      socket?.off('delete-message');
      socket?.off('history');
    }

  }, []);

  function handleChange(event)
  {
    setMessage(event.target.value);
  }

  function handleSubmit(event)
  {
    event.preventDefault();
    const content = message;
    const sender = user._id;
    const channel = locate;
    socket?.emit('client-message', {content, sender, channel});
    setMessage('');
  }

  function handleClick(messageId)
  {
    socket?.emit('delete-message', {messageId, locate});
    deleteMessage(messageId);
  }

  function deleteMessage(messageId)
  {
    const deleteMessage = messages.filter((message) => message._id != messageId);
    setMessages(deleteMessage);
  }

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {
          messages.map((message, index) =>
          (
            <ChannelMessage key={index} previousMessage={messages[index - 1]} message={message} handleClick={handleClick} />
          ))
        }
      </div>
      <form onSubmit={(event) => { handleSubmit(event) }} className={styles.input_wrapper}>
        <input value={message} onChange={(event) => { handleChange(event) }} className={styles.input} type="text" placeholder="Conversarem #chat-livre" />
      </form>
    </div>
  );
};

export default ChanelData;
