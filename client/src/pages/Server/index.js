import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import ServerName from "../../components/ServerName";
import ChannelList from "../../components/ChanelList";
import ChannelInfo from "../../components/ChanelInfo";
import UserList from "../../components/UserList";
import UserInfo from "../../components/UserInfo";
import styles from './styles.module.css';
import ServerContext from "../../context/ServerContext";
import UserContext from "../../context/UserContext";

function Server()
{
    const { server, channel } = useContext(ServerContext);
    const { user } = useContext(UserContext);

    return(
        <div className={styles.grid}> 
            <ServerName serverName={server?.name} serverId={server?._id}/>
            <ChannelList serverId={server?._id}/>
            <ChannelInfo channel={channel && channel[0]}/>
            <UserList users={server?.users}/>
            <UserInfo user={user}/>
            <Outlet/>
        </div>    
    );
}

export default Server;