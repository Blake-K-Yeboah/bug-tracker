import React from 'react';

// Import Helmet to access document head
import { Helmet } from 'react-helmet';

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar';
import Navbar from '../../layout/Navbar/Navbar';
import SelectProject from './SelectProject/SelectProject';

// Import Type
import { RouteComponentProps } from 'react-router-dom';

const ManageProjectsUsers: React.FC<RouteComponentProps> = () => {

    return (
        <>
            <Helmet>

                <title>Bug Tracker - Manage Projects Users</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <SelectProject />

            </div>
        </>
    )
}

export default ManageProjectsUsers;