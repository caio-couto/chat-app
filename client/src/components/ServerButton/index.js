import React from 'react';
import { IoIosAdd } from 'react-icons/io';
import styles from './styles.module.css';

function ServerButton({ selected, setSelected, isAddServer, toggleModal, index })
{
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
    return(
        <div onClick={() => {onHandleClick()}} className={!isAddServer && selected == index? `${styles.button} ${styles.selected}` : styles.button}>
            {isAddServer && <div><IoIosAdd/></div> }
        </div>
    );
}

export default ServerButton;