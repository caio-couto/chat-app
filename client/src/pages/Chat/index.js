import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ChannelData from "../../components/ChanelData";
import { ChatProvider } from "../../context/ChatContext";

function Server()
{
    return(
        <> 
            <ChatProvider>
                <ChannelData/>
            </ChatProvider>
        </>    
    );
}

export default Server;