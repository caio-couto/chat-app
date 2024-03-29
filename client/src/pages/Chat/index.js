import React, { useContext, useEffect } from "react";
import ChannelData from "../../components/ChanelData";
import { ChatProvider } from "../../context/ChatContext";

function Chat()
{
    return(
        <> 
            <ChatProvider>
                <ChannelData/>
            </ChatProvider>
        </>    
    );
}

export default Chat;