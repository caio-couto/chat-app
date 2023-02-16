import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.css';
import ServerButton from "../ServerButton/index";
import CreateServer from "../Modals/CreateServer/index";
import ServerContext from "../../context/ServerContext";
import mdImage from '../../images/mdImage.png'

function ServerList()
{
    const [modal, setModal] = useState(false);
    const { servers, createServer } = useContext(ServerContext);
    const [selected, setSelected] = useState(0);

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
            <Link to='@me'>
                <ServerButton setSelected={setSelected} selected={selected} index={0} srcImage={mdImage} />
            </Link>
            <span className={styles.separator}/>
            {
                servers?.map((server, index) =>
                (
                    <Link key={index} to={`/channels/${server._id}`} style={{textDecoration: 'none'}}>
                        <ServerButton name={server.name} image={server.serverImage} setSelected={setSelected} selected={selected} index={index + 1}/>
                    </Link>
                ))
            }
            <ServerButton isAddServer={true} toggleModal={toggleModal}/>
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