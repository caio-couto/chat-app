import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const baseUrl = 'http://localhost:5000/api/auth';

export function AuthProvider({ children })
{
    const tokens = localStorage.getItem('accessToken') && localStorage.getItem('refreshToken') ? {accessToken: localStorage.getItem('accessToken'), refreshToken: localStorage.getItem('refreshToken')} : null;
    const [user, setUser] = useState(() => tokens);
    const [accessToken, setAccessToke] = useState(() => tokens ? tokens.accessToken : tokens);
    const [refreshToken, setRefreshToken] = useState(() => tokens ? tokens.refreshToken : tokens);
    const navigate = useNavigate();

    function login(event)
    {
        event.preventDefault();
        fetch(`${baseUrl}/login`,
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: event.target.email.value, password: event.target.password.value})
        })
        .then((res) => res.json())
        .then((userData) =>
        {   
            setAccessToke(userData.accessToken);
            setRefreshToken(userData.refreshToken);
            setUser({name: userData.name, discriminator: userData.discriminator});
            localStorage.setItem('accessToken', userData.accessToken);
            localStorage.setItem('refreshToken', userData.refreshToken);
            navigate('/channels');
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    function logout()
    {
        setAccessToke(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('login');
    }

    function updateToken()
    {
        fetch(`${baseUrl}/refresh`,
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: refreshToken})
        })
        .then((res) => res.json())
        .then((tokensData) =>
        {   
            setAccessToke(tokensData.accessToken);
            setRefreshToken(tokensData.refreshToken);
            setUser(tokensData);
            localStorage.setItem('accessToken', tokensData.accessToken);
            localStorage.setItem('refreshToken', tokensData.refreshToken);
        })
        .catch((error) =>
        {
            logout();
            console.log(error);
        });
    }

    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            if(accessToken && refreshToken)
            {
                updateToken();
            }
        }, 60*14*1000);

        return ()=>
        {
            clearInterval(interval);
        }
    }, [accessToken, refreshToken]);

    const contextData =
    {
        user: user,
        accessToken: accessToken,
        login: login,
        logout: logout,
    };

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;