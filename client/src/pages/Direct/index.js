import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DirectData from "../../components/DirectData";
import { ChatProvider } from "../../context/ChatContext";

function Direct()
{
    return(
        <> 
            <ChatProvider>
                <DirectData/>
            </ChatProvider>
        </>    
    );
}

export default Direct;