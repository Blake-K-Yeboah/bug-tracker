import React from 'react'

import './Details.scss';

const Details = ({ project }: any) => {
    return (
        <div className="project-details">
            {project ? <>
                <h2 className="project-title">{project.name} Details</h2>
            </> : ''}
        </div>
    )
}

export default Details
