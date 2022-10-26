import React, { useRef, useEffect, useState } from 'react';
import ChannelMessage from '../ChannelMessage';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { io } from 'socket.io-client';

function ChanelData({ user })
{
  let location = useLocation().pathname.split('/');
  const messagesRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');

  //Conexão com o WebSocketIo
  useEffect(() =>
  {
    setSocket(io(`http://localhost:5000/${location[2]}`, {transports: ['websocket']}));
    fetch(`http://localhost:5000/message/${location[2]}`)
    .then((resp) => resp.json())
    .then((data) =>
    {
      setMessages(data)
    })
    .catch((error) => console.log(error));
  }, [location[2]]);

  function handleSubmit(event)
  {
    event.preventDefault();
    socket?.emit('chat-msg', 
    {
      content: inputText,
      sender: user._id,
      channel: location[2] 
    });

    setInputText('');
  }

  function chatMessages()
  {
    socket?.on('chat-msg', (data) =>
    {
      if(messages.length === 0)
      {
        setMessages(data[0]);
      }
      else
      {
        setMessages([...messages, data[0]]);
      }
    });
  }

  useEffect(() =>
  {
    scrollToBottom();
  }, [messages])

  chatMessages();

  const scrollToBottom = () => 
  {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={styles.container}>
      <div className={styles.messages} ref={messagesRef}>
      {
        messages.map((message, index) => 
        (
          <ChannelMessage key={index} message={message}/>
        ))
      }
      </div>
      <form onSubmit={(event) => { handleSubmit(event) }} className={styles.input_wrapper}>
        <input className={styles.input} onChange={(event) => {setInputText(event.target.value)}} type="text" value={inputText} placeholder="Conversarem #chat-livre" />
        <div ref={messagesRef} />
      </form>
    </div>
  );
};

export default ChanelData;