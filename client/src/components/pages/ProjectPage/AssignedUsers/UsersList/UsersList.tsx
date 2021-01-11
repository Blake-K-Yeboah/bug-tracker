import React from 'react'

// Import Componenets
import User from './User/User';

// Import Styling
import './UsersList.scss';

const UsersList = ({ users, project }: any) => {

    return (
        <div className={`users-list ${users.length > 6 ? 'more-than-six' : ''}`}>
            {users.map((userId: string) => {
                return <User userId={userId} project={project} key={userId} />
            })}
        </div>
    );

}

export default UsersList
