import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

const ChatContext = createContext();

const baseUrl = 'http://localhost:5000/api/';

export function ChatProvider({ children })
{
    const location = useLocation().pathname.split('/')[3];
    const { accessToken } = useContext(AuthContext);
    const [messages, setMessages] = useState(null);

    useEffect(() =>
    {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`);
        fetch(`${baseUrl}message/channel/${location}`,
        {
            method: 'GET',
            headers: headers
        })
        .then((res => res.json()))
        .then((channelMessages) =>
        {
            setMessages(channelMessages);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }, [location[3]]);

    function createMessage(event, content)
    {
        event.preventDefault();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`)
        fetch(`${baseUrl}message/`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({content: content, channel: location})
        })
        .then((res => res.json()))
        .then((newMessage) =>
        {
            setMessages([...messages, newMessage]);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    const contextData =
    {
        messages: messages,
        createMessage: createMessage
    };

    return(
        <ChatContext.Provider value={contextData}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatContext;