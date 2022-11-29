import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import { ServerContext } from "../ServerContext";
import DropDown from "../Modals/DropDown/index";
import { CgChevronDown, CgClose } from 'react-icons/cg';
import { IoAddCircle } from 'react-icons/io5';
import CreateServer from "../Modals/CreateServer";
import { SocketioContext } from "../SocketioContext";

function ServerName()
{
    const [server, setServer] = useContext(ServerContext);
    const [dropDown, setDropDown] = useState(false);
    const [content, setContent] = useState({});
    const [modal, setModal] = useState(false);
    const [socket, setSocket] = useContext(SocketioContext);
    const [name, setName] = useState('');

    function handleClick()
    {
        dropDown? setDropDown(false) : setDropDown(true);
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
        .then((data) =>
        {
            socket.emit('new-channel');
            setModal(false);
            setDropDown(false);
        })
        .catch((error) => console.log(error));
    }

    function handleChange(event)
    {
        setContent({...content, [event.target.name]: event.target.value});
    }

    useEffect(() =>
    {
        setName(server.name)
    },[server])

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                {name}
            </h1>
            <div onClick={() => {handleClick()}} className={styles.expand_icon}>
                {dropDown? <CgClose/> : <CgChevronDown/>}
            </div>
            <DropDown isOpen={dropDown} setIsOpen={setDropDown}>
                <div onClick={()=> {setModal(true)}} className={styles.option}>
                    <p>Criar canal</p>
                    <div className={styles.icon}>
                        <IoAddCircle/>
                    </div>
                </div>
            </DropDown>
            <CreateServer isOpen={modal} setIsOpen={setModal}>
                <div className={styles.modal_container}>
                    <div className={styles.title}>
                        <h2>Crie um novo canal</h2>
                        <p>Crie um canal para iniciar conversas sobre diferentes tópicos. Se quiser, é possivel mudar depois.</p>
                    </div>
                    <div className={styles.content}>
                        <form onSubmit={(event) => {handleSubmit(event)}}>
                            <label>NOME DO CANAL</label>
                            <input autoComplete="new-password" onChange={(event) => {handleChange(event)}} type='text' name='name' placeholder="Nome do canal"/>
                            <label>DESCRIÇÃO</label>
                            <input autoComplete="new-password" onChange={(event) => {handleChange(event)}} type='text' name='description' placeholder="Descrição do canal"/>
                            <button type="submit">Criar</button>
                        </form>
                    </div>
                </div>
            </CreateServer>
        </div>
    );
}

export default ServerName;