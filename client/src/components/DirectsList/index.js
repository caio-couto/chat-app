import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.css';
import DirectButton from "../DirectButton/index";
import { FaUserFriends } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import CreateServer from "../Modals/CreateServer";
import DirectContext from "../../context/DirectContext";
import UserContext from "../../context/UserContext";

function DirectList({ friends })
{

    const [addDropDown, setAddDropDown] = useState(false);
    const [select, setSelect] = useState([]);
    const { directs, createDirectGroup } = useContext(DirectContext);
    const { user } = useContext(UserContext);

    function handleClick()
    {
        addDropDown ? setAddDropDown(false) : setAddDropDown(true);
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        if(select.length == 0)
        {
            return 
        }
        else if(select.length == 1)
        {
            createDirectGroup(select, false);
        }
        else
        {
            createDirectGroup(select, true);
        }

        setAddDropDown(false);
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

    return(
        <div className={styles.container}>
            <Link className={styles.link}  to={`/channels/@me`}>
                <div className={styles.friends}>
                    <FaUserFriends/>
                    <span>Amigos</span>
                </div>
            </Link>  
            <div className={styles.category}>
                <span>Menssagens diretas</span>
                <div className={styles.add_category} onClick={() => handleClick()}>
                    <MdAdd/>
                </div>
            </div>  
            {
                directs?.map((direct) =>
                {
                    let directName = 'eu';

                    if(direct.isGroupDirect)
                    {
                        for(let i = 0; i < direct.users.length; i++)
                        {
                            if(direct.users[i]._id != user?._id)
                            {
                                directName = directName + ', ' + direct.users[i].username
                            }
                        }
                    }
                    else
                    {
                        directName = direct.users.filter((userDirect) => userDirect._id != user?._id)[0].username;
                    }

                    return(
                        <Link className={styles.link} key={direct._id}  to={`${direct._id}`}>
                            <DirectButton directName={directName}/>
                        </Link>
                    );
                })
            }     
            <CreateServer isOpen={addDropDown} setIsOpen={setAddDropDown}>
                <div className={styles.modal_container}>
                    <div className={styles.title}>
                        <h2>Adicione um novo amigo</h2>
                        <p>Adicione amigos no servidor e expanda a suas conversas. Converser, faça chamadas e se divirta!</p>
                    </div>
                    <div className={styles.content}>
                        <form className={styles.user_list} onSubmit={(event) => handleSubmit(event)}>
                            {
                                friends?.map((friend, index) =>
                                (
                                    <div className={styles.user_list_item} key={index}>
                                        <div>
                                            <div className={styles.avatar}></div>
                                            <strong>{friend.username}</strong>
                                        </div>
                                        <label htmlFor={index}>
                                            <span>Convidar</span>
                                            <input value={friend._id} id={index} autoComplete="new-password" onChange={(event) => handleSelect(event)} type='checkbox' name='user' placeholder="ID do usuário"/>
                                        </label>
                                    </div>
                                ))
                            }
                            <button type="submit">Criar MD</button>
                        </form>
                    </div>
                </div>
            </CreateServer>      
        </div>
    );
}

export default DirectList;