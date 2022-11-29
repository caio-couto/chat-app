import React from "react";
import styles from './styles.module.css';

function CreateServer({ children, isOpen, setIsOpen })
{
    if(!isOpen)
    {
        return null;
    }
    return(
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <button onClick={() => {setIsOpen(false)}} type="button" className={styles.modal_close}/>
                {children}
            </div>
        </div>
    );
}

export default CreateServer;