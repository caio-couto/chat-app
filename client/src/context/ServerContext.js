import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import AuthContext from "./AuthContext";
import UserContext from './UserContext';

const ServerContext = createContext();

const baseUrl = 'http://localhost:5000/api/';

export function ServerProvider({ children })
{
    const { accessToken } = useContext(AuthContext);
    const [servers, setServers] = useState(null); 
    const [channels, setChannels] = useState(null);
    const [channel, setChannel] = useState(null);
    const { user } = useContext(UserContext);
    const location = useLocation().pathname.split('/');
    const [server, setServer] = useState(null);



    useEffect(() =>
    {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`);
        fetch(`${baseUrl}server`,
        {
            method: 'GET',
            headers: headers
        })
        .then((res => res.json()))
        .then((userServers) =>
        {
            setServers(userServers);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }, [accessToken, location[2]]);

    useEffect(() =>
    {
        setChannel(channels?.filter((channel) => channel._id == location[3]));
    }, [location[3], channels]);

    useEffect(() =>
    {
        setServer(servers?.filter((server) => server._id == location[2])[0]);

        if(server?._id)
        {
            getChannels(server?._id)
        }
    }, [ servers, server]);

    function getChannels(serverId)
    {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`)
        fetch(`${baseUrl}channel/server/${serverId}`,
        {
            method: 'GET',
            headers: headers,
        })
        .then((res => res.json()))
        .then((serverChannels) =>
        {
            setChannels(serverChannels);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    function uploadImage(formData)
    {
        const headers = new Headers();
        headers.append('authorization', `Bearer ${accessToken}`)
        headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
        headers.append('Access-Control-Allow-Credentials', 'true');
        fetch(`${baseUrl}server/${server._id}/profilePic`,
        {
            method: 'POST',
            headers: headers,
            body: formData
        })
        .then((res => res.json()))
        .then(() =>
        {
            console.log('atualizado');
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    function joinServer(serverId, userId)
    {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`)
        fetch(`${baseUrl}server/${serverId}`,
        {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({userId: userId})
        })
        .then((res => res.json()))
        .then(() =>
        {
            console.log('Adicionado');
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    function createServer(event)
    {
        event.preventDefault();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`)
        fetch(`${baseUrl}server/`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({name: event.target.name.value})
        })
        .then((res => res.json()))
        .then((newServer) =>
        {
            setServers([...servers, newServer]);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    function inviteFriends(event, users)
    {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`)
        fetch(`${baseUrl}direct/invite`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({users: users})
        })
        .then((res => res.json()))
        .then((directs) =>
        {
            directs.forEach((direct) =>
            {
                fetch(`${baseUrl}message/`,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({content: server._id, channel: direct._id, isInvite: true})
                })
                .then((res => res.json()))
                .then(() =>
                {
                    console.log('enviado');
                })
                .catch((error) =>
                {
                    console.log(error);
                });
            });
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    function createChannel(event, isDirect = false, belongsTo)
    {
        event.preventDefault();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`)
        fetch(`${baseUrl}channel/`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({chatName: event.target.chatName.value, description: event.target.description.value, isDirect: isDirect, belongsTo: belongsTo})
        })
        .then((res => res.json()))
        .then((newChannel) =>
        {
            setChannels([...channels, newChannel]);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    const contextData =
    {
        servers: servers,
        server: server,
        channels: channels,
        getChannels: getChannels,
        createServer: createServer,  
        createChannel: createChannel,
        inviteFriends: inviteFriends,
        joinServer: joinServer,
        uploadImage: uploadImage,
        channel: channel
    };

    return(
        <ServerContext.Provider value={contextData}>
            {children}
        </ServerContext.Provider>
    );
}

export default ServerContext;