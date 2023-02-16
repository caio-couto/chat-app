import React, { useEffect, useState, useRef, useContext } from "react";
import styles from './styles.module.css';
import { GoGear } from 'react-icons/go';
import DropDown from "../Modals/DropDown";
import Menu from "../Modals/Menu";
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";
import UserContext from "../../context/UserContext";

function UserInfo({ user })
{
    const [date, setDate] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const [menu, setMenu] = useState(false);
    const cropperRef = useRef(null);
    const [src, setSrc] = useState(null);
    const { uploadImage } = useContext(UserContext);
    
    function toggleProfile()
    {
        dropDown ? setDropDown(false) : setDropDown(true);
    }

    useEffect(() =>
    {
        if(user?.createdAt != undefined)
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

    function openMenu()
    {
        setMenu(true);
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
            <div className={styles.profile} onClick={() => { toggleProfile() }}>
                <div className={styles.avatar}>
                    {
                        user?.profilePic != 'none' && user?.profilePic&&
                            <img className={styles.avatar_image} src={`http://localhost:5000/api/uploads/images/user/${user?.profilePic.split('/')[4]}`}/>
                    }
                </div>
                <div className={styles.user_data}>
                    <strong>{user?.username}</strong>
                    <span>#{user?.discriminator}</span>
                </div>
            </div>
            <div className={styles.icons}>
                <div onClick={() => openMenu()} className={styles.settings_icon}><GoGear/></div>
            </div>
            <DropDown isOpen={dropDown} setIsOpen={setDropDown} component='user_info'>
                <div className={styles.dropDown_Container}>
                    <div className={styles.card}>
                        <div className={styles.section}>
                            <div className={styles.avatar}>
                            {
                                user?.profilePic != 'none' && user?.profilePic&&
                                    <img className={styles.avatar_image} src={`http://localhost:5000/api/uploads/images/user/${user?.profilePic.split('/')[4]}`}/>
                            }
                            </div>
                            <div className={styles.user_data}>
                                <strong>kazumyo</strong>
                                <span>#{user?.discriminator}</span>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.title}>SOBRE MIM</div>
                            <div className={styles.content}>{user?.about}</div>
                            <div className={styles.title}>MEMBRO DISCORD DESDE</div>
                            <div className={styles.content}>{date}</div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.status}> 
                                <div className={styles.avaliable}></div>
                                <span>Disponível</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DropDown>
            <Menu isOpen={menu} setIsOpen={setMenu}>
                <div className={styles.menu_container}>
                    <div className={styles.content}>
                        <form>
                            <label>NOME DO SERVIDOR</label>
                            <label htmlFor="imageServer">escolha</label>
                            <input onChange={(event) => selectImage(event)} id="imageServer" type='file' style={{display: 'none'}}/>
                            <input autoComplete="new-password" type='text' name='name' placeholder={user?.username}/>
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

export default UserInfo;