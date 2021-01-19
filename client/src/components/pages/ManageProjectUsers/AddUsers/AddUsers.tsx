import React from 'react';

// Import Styling
import './AddUsers.scss';

// Import Components
import AddUsersList from './AddUsersList/AddUsersList';

const AddUsers = ({ project }: any) => {

    return (

        <div className="add-users">

            {project ? <>
            
                <h2 className="heading">Add Users To Project</h2>
                
                <AddUsersList project={project} />

            </> : ''}

        </div>

    )
}

export default AddUsers
