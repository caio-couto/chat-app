import React, { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const DirectContext = createContext();

const baseUrl = 'http://localhost:5000/api/';

export function DirectProvider({ children })
{
    const { accessToken } = useContext(AuthContext);
    const [directs, setDirects] = useState(null);

    useEffect(() =>
    {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`)
        fetch(`${baseUrl}direct`,
        {
            method: 'GET',
            headers: headers,
        })
        .then((res => res.json()))
        .then((directs) =>
        {
            setDirects(directs);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }, []);

    function createDirectGroup(users, isGroupDirect = false)
    {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`)
        fetch(`${baseUrl}direct`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({users: users, isGroupDirect: isGroupDirect})
        })
        .then((res => res.json()))
        .then((newDirect) =>
        {
            setDirects([...directs, newDirect]);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    const contextData = 
    {
        directs: directs,
        createDirectGroup: createDirectGroup,
    };

    return(
        <DirectContext.Provider value={contextData}>
            {children}
        </DirectContext.Provider>
    );
}

export default DirectContext;