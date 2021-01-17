import React from 'react';

// Import Helmet to access document head
import { Helmet } from 'react-helmet';

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar';
import Navbar from '../../layout/Navbar/Navbar';
import SelectProject from './SelectProject/SelectProject';

const ManageProjectsUsers: any = () => {

    return (
        <>
            <Helmet>

                <title>Bug Tracker - Manage Project Users</title>

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