import React, { useRef, useEffect, useState, useContext } from 'react';
import ChatContext from '../../context/ChatContext';
import DirectMessage from '../DirectMessage';
import styles from './styles.module.css';

function DirectData()
{
  const { messages, createMessage } = useContext(ChatContext);
  const [content, setContent] = useState('');

  function sendNewMessage(event)
  {
    if(event.key == 'Enter')
    {
      createMessage(event, content);
      setContent('');
    }
  }

  function inputValue(event)
  {
    setContent(event.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {
          messages?.map((message) =>
          (
            <DirectMessage key={message._id} message={message}/>
          ))
        }

      </div>
      <form className={styles.input_wrapper}>
        <input onKeyDown={(event) => {sendNewMessage(event)}} onChange={(event) => { inputValue(event) }} value={content} className={styles.input} type="text" name='content' placeholder="Conversarem #chat-livre" />
      </form>
    </div>
  );
};

export default DirectData;
