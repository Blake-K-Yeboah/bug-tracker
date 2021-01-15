import React, { useState, useEffect } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Styling
import './EditProject.scss';

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';

// Import Axios
import Axios from 'axios';

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

                    <div className="placeholder"></div>
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>

                </div>
                
            </div>

        </>
    )
}

export default EditProject
