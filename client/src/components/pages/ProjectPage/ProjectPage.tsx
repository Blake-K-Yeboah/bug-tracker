import React, { useState, useEffect } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import Details from './Details/Details';
import Controls from './Comments/Comments';
import AssignedUsers from './AssignedUsers/AssignedUsers';
import Tickets from './Tickets/Tickets';

// Import Axios
import Axios from 'axios';

// Import Styling
import './ProjectPage.scss';

// Import Types
import { Iproject } from '../../../types';

// Props Interface
interface PropsI {
    match: { params: { id: string }}
}

const ProjectPage = ({ match: { params: { id }} }: PropsI) => {

    const projectId = id;

    const [project, setProject] = useState<Iproject | null>(null);

    useEffect(() => {

        // Fetch Project
        const fetchProject = async () => {
            const res = await Axios.get(`/api/projects/${projectId}`);
            setProject(res.data)
        }
        fetchProject()

    }, [projectId]);

    return (
        <>
            <Helmet>

                <title>{project ? `Bug Tracker - Project: ${project.name}` : 'Loading'}</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Project</h1>
                
                <div className="project-page-grid">

                    <Details project={project} />
                    <Controls project={project} />
                    <AssignedUsers project={project} />
                    <Tickets project={project} />

                </div>
                
            </div>

        </>
    )
}

export default ProjectPage
