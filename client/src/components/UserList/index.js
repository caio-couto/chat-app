import React from "react";
import UserRow from "../UserRow";
import styles from './styles.module.css';

function UserList()
{
    return(
        <div className={styles.container}>
            <div className={styles.role}>
                Disponível - 1
            </div>
            <UserRow/>
            <div className={styles.role}>
                Disponível - 18
            </div>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
            <UserRow/>
        </div>
    );
}

export default UserList;