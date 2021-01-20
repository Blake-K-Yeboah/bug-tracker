import React, { useState, useEffect } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Styling
import './EditProject.scss';

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import AssignedUsers from '../ProjectPage/AssignedUsers/AssignedUsers';
import EditDetails from './EditDetails/EditDetails';
import DangerZone from './DangerZone/DangerZone';
import History from './History/History';

// Import Axios
import Axios from 'axios';

// Import NavLink
import { NavLink } from 'react-router-dom';

const EditProject = ({ match: { params: { id }} }: any) => {

    const [project, setProject]: any = useState(null);

    useEffect(() => {

        Axios.get(`/api/projects/${id}`).then(res => {
            setProject(res.data);
        });

    }, [id]);

    return (
        <>
            <Helmet>

                <title>Bug Tracker - Edit Project</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Editing Project - {project ? project.name : ''}</h1>
                
                <div className="edit-project-page-grid">

                    <EditDetails project={project} />
                    <DangerZone project={project} />
                    <History project={project} />
                    <AssignedUsers project={project} />

                </div>

                <NavLink to={`/project/${id}`} className="page-link">&lt; Back to project</NavLink>
                
            </div>

        </>
    )
}

export default EditProject
