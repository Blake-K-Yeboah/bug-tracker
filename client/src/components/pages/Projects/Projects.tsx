import React from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import ProjectActionsBar from './ProjectActionsBar/ProjectActionsBar';
import ProjectList from './ProjectList/ProjectList';

const Projects = () => {

    return (
        <>
            <Helmet>

                <title>Bug Tracker - Projects</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">My Projects</h1>

                <ProjectActionsBar />
                
                <ProjectList />
                
            </div>

        </>
    )
}

export default Projects
