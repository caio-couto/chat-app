import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useLocation } from "react-router-dom";
import styles from './styles.module.css';
import ServerButton from "../ServerButton/index";
import CreateServer from "../Modals/CreateServer/index";
import { ServerContext } from "../ServerContext";
import { UserContext } from "../UserContext";

function ServerList()
{
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [user, setUser] = useContext(UserContext);
    const [servers, setServers] = useState([]);
    const locate = window.location.pathname.split('/')[1];

    useEffect(() =>
    {
        setServers(user.servers);
    }, [user]);

    function handleClick()
    {
        modal? setModal(false) : setModal(true);
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        fetch('http://localhost:5000/server',
        {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json',},
            body: JSON.stringify({name}),
        })
        .then((resp) => resp.json())
        .then((server) =>
        {
            fetch(`http://localhost:5000/channel`,
            {
                method: 'POST',
                headers:{ 'Content-Type': 'application/json',},
                body: JSON.stringify({name: 'Chat geral', belongsTo: server._id}),
            })
            .then((resp) => resp.json())
            .then((channel) =>
            {
                fetch(`http://localhost:5000/server/channel/new/${server._id}`,
                {
                    method: 'PUT',
                    headers:{ 'Content-Type': 'application/json',},
                    body: JSON.stringify({channel: channel._id}),
                })
                .then((resp) => resp.json())
                .then((data) =>
                {
                    setServers(arr => [...arr, data]);
                    setModal(false);
                })
            })
            fetch(`http://localhost:5000/server/user/new/${server._id}`,
            {
                method: 'PUT',
                headers:{ 'Content-Type': 'application/json',},
                body: JSON.stringify({user: user._id}),
            })
            .then((resp) => resp.json())
            .then(() =>
            {
                fetch(`http://localhost:5000/user/newserver/${user._id}`,
                {
                    method: 'PUT',
                    headers:{ 'Content-Type': 'application/json',},
                    body: JSON.stringify({servers: server._id}),
                })
                .then((resp) => resp.json())
                .then((data) =>
                {
                })
            })
        })
        .catch((error) => console.log(error));
    }

    function handleChange(event)
    {
        setName(event.target.value);
    }

    function handleServerChange()
    {
        console.log(locate);
    }

    return(
        <div className={styles.container}>
            <Link to='/direct'>
                <ServerButton isHome={true} handleServerChange={handleServerChange}/>
            </Link>
            <span className={styles.separator}/>
            {
                servers?.map((server, index) => 
                (
                    <Link key={index} to={`${server._id}`}>
                        <ServerButton/>
                    </Link>
                ))
            }
            <ServerButton isServerAdd={true} handleClick={handleClick}/>
            <CreateServer isOpen={modal} setIsOpen={setModal}>
                <div className={styles.modal_container}>
                    <div className={styles.title}>
                        <h2>Crie seu servidor</h2>
                        <p>Deixe seu novo servidor com sua cara dando um nome e um ícone a ele. Se quiser, é possivel mudar depois.</p>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.server_icon}>

                        </div>
                        <form onSubmit={(event) => {handleSubmit(event)}}>
                            <label>NOME DO SERVIDOR</label>
                            <input autoComplete="new-password" onChange={(event) => {handleChange(event)}} type='text' name='name' placeholder="Nome do servidor"/>
                            <button type="submit">Salvar</button>
                        </form>
                    </div>
                </div>
            </CreateServer>
        </div>
    );
}

export default  ServerList;