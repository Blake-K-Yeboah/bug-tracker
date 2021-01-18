import React from 'react'

// Import Styling
import './RemoveUsers.scss';

const RemoveUsers = ({ project }: any) => {
    
    return (

        <div className="remove-users">

            {project ? <>
            
                <h2 className="heading">Remove Users From Project</h2>
                

            </> : ''}

        </div>

    )
}

export default RemoveUsers
