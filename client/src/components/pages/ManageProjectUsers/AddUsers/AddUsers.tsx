import React from 'react';

// Import Styling
import './AddUsers.scss';

// Import Components
import AddUsersList from './AddUsersList/AddUsersList';

// Import Types
import { Iproject } from '../../../../types';

// Props Interface
interface PropsI {
    project: Iproject | null
}

const AddUsers = ({ project }: PropsI) => {

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
