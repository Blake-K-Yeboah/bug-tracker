import React from 'react'

// Import Styling
import './RemoveUsers.scss';

// Import Components
import RemoveUsersList from './RemoveUsersList/RemoveUsersList';

const RemoveUsers = ({ project }: any) => {

    return (

        <div className="remove-users">

            {project ? <>
            
                <h2 className="heading">Remove Users From Project</h2>
                
                <RemoveUsersList project={project} />

            </> : ''}

        </div>

    )
}

export default RemoveUsers
