import React from "react";
import styles from './styles.module.css';
import { SlClose } from 'react-icons/sl';

function Menu({ children, isOpen, setIsOpen })
{
    if(!isOpen)
    {
        return null;
    }
    
    return(
        <div className={styles.modal}>
            <SlClose onClick={() => {setIsOpen(false)}} type="button" className={styles.modal_close}/>
            {children}
        </div>
    );
}

export default Menu;