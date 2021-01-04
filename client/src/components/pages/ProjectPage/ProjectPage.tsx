import React, { useState, useEffect } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';

// Import Axios
import Axios from 'axios';

// Import Styling
import './ProjectPage.scss';
import Details from './Details/Details';

const ProjectPage = ({ match }: any) => {

    const projectId = match.params.id;

    const [project, setProject]: any = useState(null);

    useEffect(() => {

        Axios.get(`/api/projects/${projectId}`).then(res => {
            setProject(res.data);
        }).catch(err => console.error(err));

    }, [projectId]);

    return (
        <>
            <Helmet>

                <title>Bug Tracker - {project ? project.name : 'Loading'}</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Project</h1>
                
                <div className="project-page-grid">

                    <Details project={project} />
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>

                </div>
                
            </div>

        </>
    )
}

export default ProjectPage
