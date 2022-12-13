import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import { GoGear } from 'react-icons/go';
import DropDown from "../Modals/DropDown";

function UserInfo({ user })
{
    const [date, setDate] = useState('');

    const [dropDown, setDropDown] = useState(false);
    
    function handleClick()
    {
        dropDown ? setDropDown(false) : setDropDown(true);
    }

    useEffect(() =>
    {
        if(user.createdAt != undefined)
        {
            const date = new Date(user.createdAt);
            const formatDate = new Intl.DateTimeFormat('pt-BR').format(date);
            let month = '';
            switch(formatDate.split('/')[1]) 
            {
                case '01':
                    month = 'jan'
                    break;
                case '02':
                    month = 'fer'
                    break;
                case '03':
                    month = 'mar'
                    break;
                case '04':
                    month = 'abr'
                    break;
                case '05':
                    month = 'maio'
                    break;
                case '06':
                    month = 'jun'
                    break;
                case '07':
                    month = 'jul'
                    break;
                case '08':
                    month = 'ago'
                    break;
                case '09':
                    month = 'set'
                    break;
                case '10':
                    month = 'uot'
                    break;
                case '11':
                    month = 'nov'
                    break; 
                case '12':
                    month = 'dez'
                    break;    
                default:
                    month = 'inválido' 
                break;   
            }
            setDate(`${month} ${formatDate.split('/')[0]}, ${formatDate.split('/')[2]}`);
        }

    }, [user]);

    function dateFormat()
    {
        
    }        

    return(
        <div className={styles.container}>
            <div className={styles.profile} onClick={() => {handleClick()}}>
                <div className={styles.avatar}></div>
                <div className={styles.user_data}>
                    <strong>{user.name}</strong>
                    <span>#2278</span>
                </div>
            </div>
            <div className={styles.icons}>
                <div className={styles.settings_icon}><GoGear/></div>
            </div>
            <DropDown isOpen={dropDown} setIsOpen={setDropDown} component='user_info' handleClick={handleClick}>
                <div className={styles.dropDown_Container}>
                    <div className={styles.card}>
                        <div className={styles.section}>
                            <div className={styles.avatar}></div>
                            <div className={styles.user_data}>
                                <strong>{user.name}</strong>
                                <span>#2278</span>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.title}>SOBRE MIM</div>
                            <div className={styles.content}>{user.about}</div>
                            <div className={styles.title}>MEMBRO DISCORD DESDE</div>
                            <div className={styles.content}>{date}</div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.status}>
                                {user?.status ? 
                                <div className={styles.avaliable}></div>
                                : 
                                <div className={styles.unavaliable}></div>
                                }
                                <span>{user?.status ? 'Disponível' : 'Indisponível'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DropDown>
        </div>
    );
}

export default UserInfo;