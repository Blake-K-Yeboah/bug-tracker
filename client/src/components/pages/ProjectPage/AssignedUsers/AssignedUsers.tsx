import React from 'react'

// Import Styling
import './AssignedUsers.scss';

// Import Icons
import { FaEdit } from 'react-icons/fa';

// Import Components
import UsersList from './UsersList/UsersList';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Types
import { Iproject } from '../../../../types';

// Props Interface
interface PropsI {
    project: Iproject | null
}

const AssignedUsers = ({ project }: PropsI) => {
    return (
        <div className="assigned-users">

            {project ? <>
            
                <h2 className="title">Assigned Users ({project.usersList.length + 1})</h2>
                <NavLink to={`/manage-projects-users/${project._id}`}><button className="btn primary edit-btn"><FaEdit className="icon" /></button></NavLink>
                <p className="sub-text">A list of users assigned to this project</p>
                <UsersList users={[project.owner, ...project.usersList]} project={project} />

            </> : <>
                
                <div className="loader title"></div>
                <div className="loader add"></div>

                <div className="loader-grid">
                    <div className="loader user-w-remove"></div>
                    <div className="loader user-w-remove"></div>
                    <div className="loader user-w-remove"></div>
                    <div className="loader user-w-remove"></div>
                    <div className="loader user-w-remove"></div>
                    <div className="loader user-w-remove"></div>
                </div>

            </>}

        </div>
    )
}

export default AssignedUsers
