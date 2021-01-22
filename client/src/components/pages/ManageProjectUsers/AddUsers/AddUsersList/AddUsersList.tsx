import React, { useEffect } from 'react'

// Import Styling
import './AddUsersList.scss';

// Import Components
import ListItem from './ListItem/ListItem';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import types
import { Iproject, IUsersStore } from '../../../../../types';

// Props Interface
interface PropsI {
    project: Iproject,
    usersStore?: IUsersStore
}

let AddUsersList = ({ project, usersStore }: PropsI) => {

    useEffect(() => {
        usersStore!.fetchUsers();
    }, [usersStore]); 

    const users = usersStore!.users.filter((user) => !project.usersList.includes(user._id) && user._id !== project.owner);

    return (
        <ul className="add-users-list">
            
            {users.map((user) => (
                <ListItem userId={user._id} key={user._id} projectId={project._id} />
            ))}

            {users.length === 0 ? <p style={{marginLeft: '1.75em'}}>No Users</p> : ''}

        </ul>
    )
}

// Inject Store
AddUsersList = inject('usersStore')(observer(AddUsersList));

export default AddUsersList;
