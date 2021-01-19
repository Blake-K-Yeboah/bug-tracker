import React from 'react'

// Import Styling
import './RemoveUsersList.scss';

// Import Components
import ListItem from './ListItem/ListItem';

const RemoveUsersList = ({ project }: any) => {

    return (
        <ul className="remove-users-list">
            
            {project.usersList.map((userId: string) => (
                <ListItem userId={userId} key={userId} projectId={project._id} />
            ))}

        </ul>
    )
}

export default RemoveUsersList;
