import React from 'react'

// Import Componenets
import User from './User/User';

// Import Styling
import './UsersList.scss';

// Import Types
import { Iproject } from '../../../../../types';

// Props Interface
interface PropsI {
    project: Iproject,
    users: string[]
}

const UsersList = ({ users, project }: PropsI) => {

    return (
        <div className={`users-list ${users.length > 6 ? 'more-than-six' : ''}`}>
            {users.map((userId) => {
                return <User userId={userId} project={project} key={userId} />
            })}
        </div>
    );

}

export default UsersList
