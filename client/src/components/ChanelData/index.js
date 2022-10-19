import React, { useRef, useEffect } from 'react';
import ChannelMessage from '../ChannelMessage';
import styles from './styles.module.css';

function ChanelData()
{
  const messagesRef = useRef();

  useEffect(() => 
    {
        const div = messagesRef.current;

        if (div) 
        {
            div.scrollTop = div.scrollHeight;
        }
    }, [messagesRef]);

  return (
    <div className={styles.container}>
      <div className={styles.messages} ref={messagesRef}>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
        <ChannelMessage/>
      </div>

      <div className={styles.input_wrapper}>
        <input className={styles.input} type="text" placeholder="Conversarem #chat-livre" />
      </div>
    </div>
  );
};

export default ChanelData;