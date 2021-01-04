import React, { useEffect, useState } from 'react'

import './Details.scss';

let Details = ({ project }: any) => {

    const [ownerName, setOwnerName] = useState(null);
    
    return (
        <div className="project-details">
            {project && ownerName ? <>
                <h2 className="project-title">&#39;{project.name}&#39; Details</h2>
                <span className="project-detail"><b>Description</b>: {project.description}</span>
                <span className="project-detail"><b>Owner</b>: {ownerName}</span>

            </> : ''}
        </div>
    )
}

export default Details
