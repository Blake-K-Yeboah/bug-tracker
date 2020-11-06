import React from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import NewProjectContainer from './NewProjectContainer/NewProjectContainer';

const NewProject = () => {

    return (
        <>
            <Helmet>

                <title>Bug Tracker - New Project</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <NewProjectContainer />

            </div>

        </>
    )
}

export default NewProject;
