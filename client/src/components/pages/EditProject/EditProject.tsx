import React from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Styling
import './EditProject.scss';

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';

const EditProject = ({ match: { params: { id }} }: any) => {
    return (
        <>
            <Helmet>

                <title>Bug Tracker - Edit Project</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Edit Project</h1>
                
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
