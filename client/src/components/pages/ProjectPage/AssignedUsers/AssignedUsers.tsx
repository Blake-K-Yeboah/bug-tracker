import React from 'react'

// Import Styling
import './AssignedUsers.scss';

// Import Icons
import { FaPlus } from 'react-icons/fa';

// Import Components
import UsersList from './UsersList/UsersList';

const AssignedUsers = ({ project }: any) => {
    return (
        <div className="assigned-users">

            {project ? <>
            
                <h2 className="title">Assigned Users ({project.usersList.length + 1})</h2>
                <button className="btn primary add-btn"><FaPlus className="icon" /></button>
                <p className="sub-text">A list of users assigned to this project</p>
                <UsersList users={[project.owner, ...project.usersList]} project={project} />

            </> : ''}

        </div>
    )
}

export default AssignedUsers
