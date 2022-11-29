import React from "react";
import styles from './styles.module.css';

function DropDown({ children, isOpen, setIsOpen })
{
    if(!isOpen)
    {
        return null;
    }
    return(
        <div className={styles.dropdown}>
            {children}
        </div>
    );
}

export default DropDown;