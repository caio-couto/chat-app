import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import ServerList from "../ServerList";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SecondaryRoutes from "../SecondaryRoutes";
import TertiaryRoutes from "../TertiaryRoutes";

function Layout ()
{
    const [servers, setServers] = useState([]);
    const [user, setUser] = useState({})

    useEffect(() =>
    {
        fetch('http://localhost:5000/user/63503e6c6e687d8b1b7c4e89',
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then((resp) => resp.json())
        .then((data) =>
        {
            setServers(data.servers);
            setUser(data)
        })
        .catch((error) => console.log(error)); 
        
    }, [])

    return(
        <Router>
            <div className={styles.main}>
                <ServerList servers={servers}/>
                <Routes>
                    {
                        servers.map((server) => (
                            <Route key={server._id} path={`:${server.id}`} element={<SecondaryRoutes server={server} user={user}/>}>
                                {
                                    server.channels.map((id) => (
                                        <Route key={id} path={`:${id}`} element={<TertiaryRoutes user={user}/>}/>
                                    ))
                                }
                            </Route>
                        ))
                    }
                </Routes>
            </div>
        </Router>
    );
}

export default Layout;

{/* <Router>
<div className={styles.main}>
    <ServerList/>
    <Routes>
    <div className={styles.grid}>
        <ServerName />
        <ChanelInfo />
        <ChanelList />
        <UserInfo />
        <div className={styles.channelData_wrapper}>
            <ChanelData />
        </div>
        <UserList />
    </div>
    </Routes>
</div>
</Router> */}