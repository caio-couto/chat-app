import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import { ServerContext } from "../ServerContext";
import DropDown from "../Modals/DropDown/index";
import { CgChevronDown, CgClose } from 'react-icons/cg';
import { IoAddCircle } from 'react-icons/io5';
import { HiUserAdd } from 'react-icons/hi'
import CreateServer from "../Modals/CreateServer";
import { ChannelContext } from "../ChannelContext";

function ServerName({ isDirect = false, server, setServer, socket, user })
{
    const [dropDown, setDropDown] = useState(false);
    const [content, setContent] = useState({});
    const [select, setSelect] = useState([]);
    const [createServerModal, setCreateServerModal] = useState(false);
    const [addUserModal, setAddUserModal] = useState(false);
    const [channel, setChannel, direct, setDirect]= useContext(ChannelContext);

    function handleClick()
    {
        dropDown? setDropDown(false) : setDropDown(true);
    }

    function handleChange(event)
    {
        setContent({...content, [event.target.name]: event.target.value});
    }

    function handleSelect(event)
    {
        if(event.target.checked)
        {
            setSelect([...select, event.target.value]);
        }
        else
        {
            setSelect(select.filter((option) => option != event.target.value));
        }
    }

    function handleCreateChannel(event)
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
                setCreateServerModal(false);
                setDropDown(false);
                if(channel)
                {
                    socket?.emit('new-channel', {newChannel: currenrChannel});
                }
                setContent({});
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }

    function handleAddUser(event)
    {
        event.preventDefault();
        fetch(`http://localhost:5000/user/new/friend/${user._id}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({friend: content.friend})
        })
        .then((res) => res.json())
        .then((data) =>
        {
            setCreateServerModal(false);
            setContent({});
            setDirect(arr => [...arr, data]);
        })
        .catch((error) => console.log(error));
    }

    function handleAddServerUser(event)
    {
        event.preventDefault();
        socket?.emit('add-server-user', select, server._id, server.name, user._id);
        setSelect([]);
        setAddUserModal(false);
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                {isDirect ? 'Mensagens Diretas' : server?.name}
            </h1>
            <div onClick={() => {handleClick()}} className={styles.expand_icon}>
                {dropDown? <CgClose/> : <CgChevronDown/>}
            </div>
            <DropDown isOpen={dropDown} setIsOpen={setDropDown} component='server_name'>
                <div onClick={()=> {setCreateServerModal(true)}} className={styles.option}>
                    <p>{isDirect? 'Adicionar amigo' : 'Criar canal'}</p>
                    <div className={styles.icon}>
                        <IoAddCircle/>
                    </div>
                </div>
                {
                    !isDirect&&
                    <div onClick={()=> {setAddUserModal(true)}} className={styles.option}>
                        <p>Adicionar amigo</p>
                        <div className={styles.icon}>
                            <HiUserAdd/>
                        </div>
                    </div>
                }

            </DropDown>
            <CreateServer isOpen={createServerModal} setIsOpen={setCreateServerModal}>
                <div className={styles.modal_container}>
                    <div className={styles.title}>
                        <h2>{isDirect? 'Adicione um novo amigo' : 'Crie um novo canal'}</h2>
                        <p>{isDirect? 'Adicione amigos para iniciar mensagens diretas. Converser, faça chamadas e se divirta!' : 'Crie um canal para iniciar conversas sobre diferentes tópicos. Se quiser, é possivel mudar depois.'}</p>
                    </div>
                    <div className={styles.content}>
                        {isDirect ?
                        <form onSubmit={(event) => {handleAddUser(event)}}>
                            <label>ID DO AMIGO</label>
                            <option autoComplete="new-password" onChange={(event) => {handleChange(event)}} type='text' name='friend' placeholder="ID do usuário"/>
                            <button type="submit">{isDirect? 'Adicionar' : 'Criar'}</button>
                        </form>
                        :
                        <form onSubmit={(event) => {handleCreateChannel(event)}}>
                            <label>NOME DO CANAL</label>
                            <input autoComplete="new-password" onChange={(event) => {handleChange(event)}} type='text' name='name' placeholder="Nome do canal"/>
                            <label>DESCRIÇÃO</label>
                            <option autoComplete="new-password" onChange={(event) => {handleChange(event)}} type='text' name='description' placeholder="Descrição do canal"/>
                            <button type="submit">{isDirect? 'Adicionar' : 'Criar'}</button>
                        </form>
                        }
                    </div>
                </div>
            </CreateServer>
            <CreateServer isOpen={addUserModal} setIsOpen={setAddUserModal}>
                <div className={styles.modal_container}>
                    <div className={styles.title}>
                        <h2>Adicione um novo amigo</h2>
                        <p>Adicione amigos no servidor e expanda a suas conversas. Converser, faça chamadas e se divirta!</p>
                    </div>
                    <div className={styles.content}>
                        <form className={styles.user_list} onSubmit={(event) => {handleAddServerUser(event)}}>
                            {
                                user.friends?.map((friend, index) =>
                                (
                                    <div className={styles.user_list_item} key={index}>
                                        <div>
                                            <div className={styles.avatar}></div>
                                            <strong>{friend.friend.name}</strong>
                                        </div>
                                        <label htmlFor={index}>
                                            <span>Convidar</span>
                                            <input value={friend.direct} id={index} autoComplete="new-password" onChange={(event) => {handleSelect(event)}} type='checkbox' name='user' placeholder="ID do usuário"/>
                                        </label>
                                    </div>
                                ))
                            }
                            <button type="submit">Adicionar</button>
                        </form>
                    </div>
                </div>
            </CreateServer>
        </div>
    );
}

export default ServerName;