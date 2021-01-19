import React, { useEffect } from 'react'

// Import Styling
import './AddUsersList.scss';

// Import Components
import ListItem from './ListItem/ListItem';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import types
import { IStoreProps, Iuser } from '../../../../../types';

let AddUsersList = ({ project, usersStore }: IStoreProps) => {

    useEffect(() => {
        usersStore.fetchUsers();
    }, [usersStore]); 

    const users = usersStore.users.filter((user: Iuser) => !project.usersList.includes(user._id) && user._id !== project.owner);

    return (
        <ul className="add-users-list">
            
            {users.map((user: Iuser) => (
                <ListItem userId={user._id} key={user._id} projectId={project._id} />
            ))}

            {users.length === 0 ? <p style={{marginLeft: '1.75em'}}>No Users</p> : ''}

        </ul>
    )
}

AddUsersList = inject('usersStore')(observer(AddUsersList));

export default AddUsersList;
