import React, { useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import styles from './styles.module.css';

function ServerButton({ selected, setSelected, isAddServer = false, toggleModal, index, image = false, name})
{
    let [nameIcon, setNameIcon] = useState(null);

    function onHandleClick()
    {
        if(isAddServer)
        {
            if(toggleModal)
            {
                toggleModal();
            }
        }

        if(setSelected)
        {
            setSelected(index);
        }
    }

    useEffect(() =>
    {
        getServerIcon(name);
    }, []);

    function getServerIcon(serverName)
    {
        if(serverName)
        {
            let nameParts = serverName.split(' ');

            let nameIconStr = '';
    
            for(let i = 0; i < nameParts.length; i++)
            {
                nameIconStr = nameIconStr + nameParts[i].substring(0,1);
            }
    
            setNameIcon(nameIconStr);
        }

    }

    return(
        <div onClick={() => {onHandleClick()}} className={!isAddServer && selected == index? `${styles.button} ${styles.selected}` : styles.button}>
            {isAddServer && <div><IoIosAdd/></div> }
            {
                image && image != 'none'?
                <img src={`http://localhost:5000/api/uploads/images/server/${image.split('/')[4]}`}/>
                :
                isAddServer == false && index != 0&&
                <div className={styles.serverIconName}>
                    {nameIcon}
                </div>
            }
            {
                index == 0&&
                <img src={`https://s2.glbimg.com/sXsPFRk4Vmct2ALKnCa1t_YePqg=/0x0:1514x917/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/h/w/Abq4oBSySsO0xmGnkDlg/discord.jpg`}/>
            }
        </div>
    );
}

export default ServerButton;