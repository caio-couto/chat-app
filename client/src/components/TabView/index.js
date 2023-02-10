import React, { useRef, useEffect, useState, useContext } from 'react';
import styles from './styles.module.css';
import { FaUserFriends } from 'react-icons/fa';

function TabView({ tabs = {} })
{
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  function activeTab(index)
  {
    setActiveTabIndex(index);
  }

  return (
    <div className={styles.container}>
        {
        Object.keys(tabs).length === 0 ? 
        <div>no tabs</div>
        :
        <>
            <div className={styles.optionsContainer}>
            <div className={styles.friends}>
                <FaUserFriends/>
                <span>Amigos</span>
            </div>  
            {
                tabs.map((tab, index) =>
                (
                <label onClick={() => activeTab(index)} key={index} className={index === activeTabIndex ? `${styles.active_tab} ${styles.tab}` : styles.tab}>
                    {tab.name}
                </label>
                ))
            }
            </div>
            <div className={styles.content}>
            {tabs[activeTabIndex].content}
            </div>
        </>
        }
    </div>
  );
};

export default TabView;