import React, { useEffect, useState} from "react";

function ServerBar()
{
    const [servers, setServers] = useState([]);

    useEffect(() =>
    {
        fetch('http://localhost:5000/user/634e91abcc7e298384a63a3f',
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) =>
        {
            setServers(data.servers)
        })
        .catch((error) => console.log(error));
    },[])

    console.log(servers);

    return(
        <>  
            <div>
                <h1>servers</h1>
                {
                    servers.map((server) => 
                    (
                        <div key={server}>
                            <p>{server}</p>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default ServerBar;