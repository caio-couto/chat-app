import React from "react";
import styles from './styles.module.css';

function DropDown({ children, isOpen, setIsOpen, component })
{
    if(!isOpen)
    {
        return null;
    }

    function handleClick()
    {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }

    return(
        <>
            <div className={styles.backdrop} onClick={() => {handleClick()}}>
                <div className={`${styles.dropdown} ${styles[component]}`}>
                    {children}
                </div>
            </div>
        </>

    );
}

export default DropDown;