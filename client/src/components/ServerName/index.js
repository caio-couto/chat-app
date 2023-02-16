import React, { useContext, useEffect, useState, useRef } from "react";
import styles from './styles.module.css';
import DropDown from "../Modals/DropDown/index";
import { CgChevronDown, CgClose } from 'react-icons/cg';
import { IoAddCircle } from 'react-icons/io5';
import { HiUserAdd } from 'react-icons/hi'
import { BsGearFill } from 'react-icons/bs';
import CreateServer from "../Modals/CreateServer";
import ServerContext from "../../context/ServerContext";
import UserContext from "../../context/UserContext";
import ChatContext from "../../context/ChatContext";
import Menu from "../Modals/Menu";
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

function ServerName({ serverName, serverId })
{
    const [dropDown, setDropDown] = useState(false);
    const [select, setSelect] = useState([]);
    const [createServerModal, setCreateServerModal] = useState(false);
    const [addUserModal, setAddUserModal] = useState(false);
    const { user } = useContext(UserContext);
    const { inviteFriends, createChannel, uploadImage } = useContext(ServerContext);
    const [menu, setMenu] = useState(false);
    const [src, setSrc] = useState(null);
    const cropperRef = useRef(null);


    function toggleModal(modal, setModal)
    {
        modal? setModal(false) : setModal(true);
    }

    function createNewChannel(event)
    {
        createChannel(event, false, serverId);
        setCreateServerModal(false);
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

    function handleSubmit(event)
    {
        event.preventDefault();
        inviteFriends(event, select);
        setSelect([]);
        setAddUserModal(false);
    }

    function selectImage(event)
    {
        const input = event.target;
        if(input.files)
        {
            const reader = new FileReader();

            reader.onload = function(event)
            {
                setSrc(event.target.result);
            }

            reader.readAsDataURL(input.files[0])
        }
    }

    function onCrop(event)
    {
        event.preventDefault();
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        const canvas = cropper.getCroppedCanvas();

        if(canvas == null)
        {
            return
        }
        
        canvas.toBlob((blob) =>
        {
            const formData = new FormData();
            formData.append('croppedImage', blob);

            uploadImage(formData);
        });
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
                <div className={styles.option} onClick={() => {toggleModal(menu, setMenu)}}>
                    <p>Config. do servidor</p>
                    <div className={styles.icon}>
                        <BsGearFill/>
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
                        <form className={styles.user_list} onSubmit={(event) => handleSubmit(event)}>
                            {
                                user?.friends.map((friend) =>
                                {
                                    const isSelected = select.find((element) => element == friend._id) != undefined ? true : false;

                                    return(
                                        <div className={styles.user_list_item} key={friend._id}>
                                            <div>
                                                <div className={styles.avatar}></div>
                                                <strong>{friend.username}</strong>
                                            </div>
                                            <label>
                                                <span>Convidar</span>
                                                <input value={friend._id} checked={isSelected} onChange={(event) => handleSelect(event)} autoComplete="new-password" type='checkbox' name='user' placeholder="ID do usuário"/>
                                            </label>
                                        </div>
                                    );
                                })
                            }
                            <button type="submit">Adicionar</button>
                        </form>
                    </div>
                </div>
            </CreateServer>
            <Menu isOpen={menu} setIsOpen={setMenu}>
                <div className={styles.menu_container}>
                    <div className={styles.content}>
                        <form>
                            <label>NOME DO SERVIDOR</label>
                            <label htmlFor="imageServer">escolha</label>
                            <input onChange={(event) => selectImage(event)} id="imageServer" type='file' style={{display: 'none'}}/>
                            <input autoComplete="new-password" type='text' name='name' placeholder={serverName}/>
                            <button type="submit">Criar</button>
                            {
                                src&&
                                <div>
                                    <Cropper src={src} style={{ height: 400, width: 400 }} initialAspectRatio={1} viewMode={1} guides={true} minCropBoxHeight={10} minCropBoxWidth={10} ref={cropperRef} background={false}/>
                                    <button onClick={(event) => onCrop(event)}>Cortar</button>
                                </div>
                                
                            }
                        </form>
                    </div>
                </div>
            </Menu>
        </div>
    );
}

export default ServerName;

                            {/* <Cropper src={`http://localhost:5000${user?.profilePic}`} style={{ height: 400, width: 400 }} initialAspectRatio={1} viewMode={1} guides={true} minCropBoxHeight={10} minCropBoxWidth={10} ref={cropperRef} background={false}/> */}
