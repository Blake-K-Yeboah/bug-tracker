import React from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import UsersTable from './UsersTable/UsersTable';

const ManageUserRoles = () => {
    return (
        <>
            <Helmet>

                <title>Bug Tracker - Manage User Roles</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Manage User Roles</h1>

                <UsersTable />

            </div>

        </>
    )
}

export default ManageUserRoles
