import React, { useRef, useEffect, useState, useContext } from 'react';
import ChannelMessage from '../ChannelMessage';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { SocketioContext } from "../SocketioContext";

function ChanelData({ user })
{
  const locate = useLocation().pathname.split('/')[2];
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useContext(SocketioContext);

  useEffect(() =>
  {
    fetch(`http://localhost:5000/message/${locate}`, 
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    },)
    .then((resp) => resp.json())
    .then((data) =>
    {
      setMessages(data);
    })
    .catch((error) => console.log(error));
  }, [locate]);
  
  useEffect(() =>
  {
    socket.emit('join-room', locate);
 
    return () =>
    {
      socket.off('join-room') 
    }
  }, [locate]);

  useEffect(() =>
  {
    socket.on('server-message', (data) =>
    {
      setMessages(arr => [...arr, data]);
    });

    return () =>
    {
      socket.off('server-message')
    }

  }, [socket])

  function handleChange(event)
  {
    setMessage(event.target.value);
  }

  function handleSubmit(event)
  {
    const content = message;
    const sender = user._id;
    const channel = locate;

    event.preventDefault();
    socket.emit('client-message', {content, sender, channel});
    setMessage('');
  }

  function handleClick(messageId)
  {
    socket.emit('delete-message', {messageId});
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
