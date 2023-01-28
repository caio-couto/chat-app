import React, { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const UserContext = createContext();

const baseUrl = 'http://localhost:5000/api/';

export function UserProvider({ children })
{
    const { accessToken } = useContext(AuthContext);
    const [user, setUser] = useState(null); 

    useEffect(() =>
    {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Bearer ${accessToken}`)
        fetch(`${baseUrl}user`,
        {
            method: 'GET',
            headers: headers
        })
        .then((res => res.json()))
        .then((userData) =>
        {
            setUser(userData);
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }, []);

    const contextData =
    {
        user: user,
    };

    return(
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;