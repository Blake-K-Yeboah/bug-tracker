import React from 'react'

// Import Styling
import './AssignedUsers.scss';

// Import Icons
import { FaPlus } from 'react-icons/fa';

const AssignedUsers = ({ project }: any) => {
    return (
        <div className="assigned-users">

            {project ? <>
            
                <h2 className="title">Assigned Users</h2>
                <button className="btn primary add-btn"><FaPlus className="icon" /></button>
                
            </> : ''}

        </div>
    )
}

export default AssignedUsers
