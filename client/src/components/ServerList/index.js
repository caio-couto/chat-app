import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.css';
import ServerButton from "../ServerButton/index";
import CreateServer from "../Modals/CreateServer/index";
import ServerContext from "../../context/ServerContext";

function ServerList()
{
    const [modal, setModal] = useState(false);
    const { servers, createServer } = useContext(ServerContext);

    function toggleModal()
    {
        modal ? setModal(false) : setModal(true);
    }

    function createNewServer(event)
    {
        createServer(event);
        setModal(false);
    }

    return(
        <div className={styles.container}>
            <Link to='/direct'>
                <ServerButton/>
            </Link>
            <span className={styles.separator}/>
            {
                servers?.map((server) =>
                (
                    <Link key={server._id} to={`/channels/${server._id}`}>
                        <ServerButton/>
                    </Link>
                ))
            }
            <ServerButton isServerAdd={true} toggleModal={toggleModal}/>
            <CreateServer isOpen={modal} setIsOpen={setModal}>
                <div className={styles.modal_container}>
                    <div className={styles.title}>
                        <h2>Crie seu servidor</h2>
                        <p>Deixe seu novo servidor com sua cara dando um nome e um ícone a ele. Se quiser, é possivel mudar depois.</p>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.server_icon}>

                        </div>
                        <form onSubmit={(event) => { createNewServer(event) }}>
                            <label>NOME DO SERVIDOR</label>
                            <input autoComplete="new-password" type='text' name='name' placeholder="Nome do servidor"/>
                            <button type="submit">Criar</button>
                        </form>
                    </div>
                </div>
            </CreateServer>
        </div>
    );
}

export default  ServerList;