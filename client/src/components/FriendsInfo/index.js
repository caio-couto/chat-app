import React, { useRef, useEffect, useState, useContext } from 'react';
import styles from './styles.module.css';
import { BsFillChatLeftFill, BsThreeDotsVertical } from 'react-icons/bs';
import TabView from '../TabView';
import UserContext from '../../context/UserContext';

function FriendsInfo({friends})
{
  return (
    <div className={styles.container}>
      <TabView tabs={
        [
          {name: 'Disponível', content: <OnlineUsers friends={friends}/>},
          {name: 'Todos', content: <AllUsers friends={friends}/>}, 
          {name: 'Adicionar amigo', content: <AddFriend/>}
        ]}/>
    </div>
  );
};

function OnlineUsers({friends})
{
  const [onlineFriends, setOnlineFriends] = useState(null);

  useEffect(() =>
  {
    setOnlineFriends(friends?.filter((friend) => friend.status != false));
  }, [friends]);

  return(
    <>
      <div className={styles.counter}> 
        Online - {onlineFriends?.length}
      </div>
      {
        onlineFriends?.map((friend) =>
        (
          <div className={styles.friend} key={friend._id}> 
            <div className={styles.profile}>
                  <div className={styles.avatar}>
                    {
                      friend.profilePic != 'none' && friend.profilePic &&
                        <img className={styles.profile_pic} src={`http://localhost:5000/api/uploads/images/user/${friend.profilePic.split('/')[4]}`} />
                    }
                  </div>
                  <div className={styles.user_data}>
                      <strong>{friend.username}</strong>
                      <span>{friend.status ? 'Online' : 'Offline'}</span>
                  </div>
            </div>
            <div className={styles.buttons}>
              <div className={styles.button}>
                <BsFillChatLeftFill/>
              </div>
              <div className={styles.button}>
                <BsThreeDotsVertical/>
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
}

function AllUsers({friends})
{

  return(
    <>
      <div className={styles.counter}> 
        Todos os amigos - {friends?.length}
      </div>
      {
        friends?.map((friend) =>
        (
          <div className={styles.friend} key={friend._id}> 
            <div className={styles.profile}>
                  <div className={styles.avatar}>
                    {
                      friend.profilePic != 'none'&&
                        <img className={styles.profile_pic} src={`http://localhost:5000/api/uploads/images/user/${friend.profilePic.split('/')[4]}`} />
                    }
                  </div>
                  <div className={styles.user_data}>
                      <strong>{friend.username}</strong>
                      <span>{friend.status ? 'Online' : 'Offline'}</span>
                  </div>
            </div>
            <div className={styles.buttons}>
              <div className={styles.button}>
                <BsFillChatLeftFill/>
              </div>
              <div className={styles.button}>
                <BsThreeDotsVertical/>
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
}

function AddFriend()
{
  const { addFriend } = useContext(UserContext);

  function handleSubmit(event)
  {
    event.preventDefault();
    addFriend(event)
  }

  return(
    <div className={styles.add_user}>
      <h2> Adicionar amigo </h2>
      <p>Você pode adicionar amigos com a Discord Tag deles. CuIdAdO cOm As MaIúScUlAs!</p>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className={styles.friendInput}>
          <input type='text' placeholder='Insira um nome de usuário#0000' name='friendUsername'/>
          <button type='submit'>Enviar Pedido</button>
        </div>
      </form>
    </div>
  );
}

export default FriendsInfo;

