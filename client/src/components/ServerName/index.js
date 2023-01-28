import React, { useContext, useEffect, useState } from "react";
import styles from './styles.module.css';
import DropDown from "../Modals/DropDown/index";
import { CgChevronDown, CgClose } from 'react-icons/cg';
import { IoAddCircle } from 'react-icons/io5';
import { HiUserAdd } from 'react-icons/hi'
import CreateServer from "../Modals/CreateServer";
import ServerContext from "../../context/ServerContext";

function ServerName({ serverName, serverId })
{
    const [dropDown, setDropDown] = useState(false);
    const [createServerModal, setCreateServerModal] = useState(false);
    const [addUserModal, setAddUserModal] = useState(false);

    const { createChannel } = useContext(ServerContext);


    function toggleModal(modal, setModal)
    {
        modal? setModal(false) : setModal(true);
    }

    function createNewChannel(event)
    {
        createChannel(event, false, serverId);
        setCreateServerModal(false);
    }
    
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                {
                    serverName
                }
            </h1>
            <div onClick={() => {toggleModal(dropDown, setDropDown)}} className={styles.expand_icon}>
                {dropDown? <CgClose/> : <CgChevronDown/>}
            </div>
            <DropDown isOpen={dropDown} setIsOpen={setDropDown} component='server_name'>
                <div className={styles.option} onClick={() => {toggleModal(createServerModal, setCreateServerModal)}}>
                    <p>Criar Canal</p>
                    <div className={styles.icon}>
                        <IoAddCircle/>
                    </div>
                </div>
                    <div className={styles.option} onClick={() => {toggleModal(addUserModal, setAddUserModal)}}>
                        <p>Adicionar amigo</p>
                        <div className={styles.icon}>
                            <HiUserAdd/>
                        </div>
                    </div>
            </DropDown>
            <CreateServer isOpen={createServerModal} setIsOpen={setCreateServerModal}>
                <div className={styles.modal_container}>
                    <div className={styles.title}>
                        <h2>Crie um novo canal</h2>
                        <p>Crie um canal para iniciar conversas sobre diferentes tópicos. Se quiser, é possivel mudar depois.</p>
                    </div>
                    <div className={styles.content}>
                        <form onSubmit={(event) => { createNewChannel(event) }}>
                            <label>NOME DO CANAL</label>
                            <input autoComplete="new-password" type='text' name='chatName' placeholder="Nome do canal"/>
                            <label>DESCRIÇÃO</label>
                            <input autoComplete="new-password" type='text' name='description' placeholder="Nome do canal"/>
                            <button type="submit">Criar</button>
                        </form>
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
                        <form className={styles.user_list}>
                                    <div className={styles.user_list_item}>
                                        <div>
                                            <div className={styles.avatar}></div>
                                            <strong></strong>
                                        </div>
                                        <label>
                                            <span>Convidar</span>
                                            <input autoComplete="new-password" type='checkbox' name='user' placeholder="ID do usuário"/>
                                        </label>
                                    </div>
                            <button type="submit">Adicionar</button>
                        </form>
                    </div>
                </div>
            </CreateServer>
        </div>
    );
}

export default ServerName;