import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children })
{
    const [user, setUser] = useState({});

    function getRandomArbitrary(min, max) 
    {
        return Math.floor(Math.random() * (max - min) + min);
    }

    useEffect(() =>
    {
        fetch(`http://localhost:5000/user/${getRandomArbitrary(0, 2) == 1? '6388e8f1afa5bd5733b1587e' : '6388e8faafa5bd5733b15880'}`)
        .then((resp) => resp.json())
        .then((user) =>
        {
            setUser(user);
        })
        .catch((error) => console.log(error));
    }, []);

    return(
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
}