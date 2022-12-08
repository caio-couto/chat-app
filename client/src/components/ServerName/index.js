import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import { ServerContext } from "../ServerContext";
import DropDown from "../Modals/DropDown/index";
import { CgChevronDown, CgClose } from 'react-icons/cg';
import { IoAddCircle } from 'react-icons/io5';
import CreateServer from "../Modals/CreateServer";
import { ChannelContext } from "../ChannelContext";
import { useLocation } from "react-router-dom";

function ServerName({ isDirect = false, server, socket })
{
    const [dropDown, setDropDown] = useState(false);
    const [content, setContent] = useState({});
    const [modal, setModal] = useState(false);
    const [channel, setChannel, direct, setDirect]= useContext(ChannelContext);

    function handleClick()
    {
        dropDown? setDropDown(false) : setDropDown(true);
    }

    function handleChange(event)
    {
        setContent({...content, [event.target.name]: event.target.value});
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        fetch(`http://localhost:5000/channel`, 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: content.name, belongsTo: server._id}),
        })
        .then((resp) => resp.json())
        .then((currenrChannel) =>
        {
            fetch(`http://localhost:5000/server/channel/new/${server._id}`, 
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({channel: currenrChannel._id}),
            })
            .then((resp) => resp.json())
            .then((server) =>
            {
                setModal(false);
                setDropDown(false);
                if(channel)
                {
                    socket?.emit('new-channel', {newChannel: currenrChannel})
                    setChannel(arr => [...arr, currenrChannel]);
                }
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                {isDirect ? 'Mensagens Diretas' : server?.name}
            </h1>
            <div onClick={() => {handleClick()}} className={styles.expand_icon}>
                {dropDown? <CgClose/> : <CgChevronDown/>}
            </div>
            <DropDown isOpen={dropDown} setIsOpen={setDropDown}>
                <div onClick={()=> {setModal(true)}} className={styles.option}>
                    <p>{isDirect? 'Adicionar amigo' : 'Criar canal'}</p>
                    <div className={styles.icon}>
                        <IoAddCircle/>
                    </div>
                </div>
            </DropDown>
            <CreateServer isOpen={modal} setIsOpen={setModal}>
                <div className={styles.modal_container}>
                    <div className={styles.title}>
                        <h2>{isDirect? 'Adicione um novo amigo' : 'Crie um novo canal'}</h2>
                        <p>{isDirect? 'Adicione amigos para iniciar mensagens diretas. Converser, faça chamadas e se divirta!' : 'Crie um canal para iniciar conversas sobre diferentes tópicos. Se quiser, é possivel mudar depois.'}</p>
                    </div>
                    <div className={styles.content}>
                        <form onSubmit={(event) => {handleSubmit(event)}}>
                            <label>NOME DO CANAL</label>
                            <input autoComplete="new-password" onChange={(event) => {handleChange(event)}} type='text' name='name' placeholder="Nome do canal"/>
                            <label>DESCRIÇÃO</label>
                            <input autoComplete="new-password" onChange={(event) => {handleChange(event)}} type='text' name='description' placeholder="Descrição do canal"/>
                            <button type="submit">{isDirect? 'Adicionar' : 'Criar'}</button>
                        </form>
                    </div>
                </div>
            </CreateServer>
        </div>
    );
}

export default ServerName;