import React from 'react'

// Import Styling
import './AssignedUsers.scss';

const AssignedUsers = ({ project }: any) => {
    return (
        <div className="assigned-users">

            {project ? <>
            
                <h2 className="title">Assigned Users</h2>
            
            </> : ''}
            
        </div>
    )
}

export default AssignedUsers
