import React, { useEffect, useState } from 'react';

// Import Helmet to access document head
import { Helmet } from 'react-helmet';

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar';
import Navbar from '../../layout/Navbar/Navbar';
import RemoveUsers from './RemoveUsers/RemoveUsers';
import AddUsers from './AddUsers/AddUsers';

// Import Axios
import Axios from 'axios';

// Import Styling
import './ManageProjectUsers.scss';

const ManageProjectUsers: any = ({ match: { params: { id }}}: any) => {

    const [project, setProject]: any = useState('');

    useEffect(() => {

        Axios.get(`/api/projects/${id}`).then(res => {
            setProject(res.data);
        });

    }, [id]);

    return (
        <>
            <Helmet>

                <title>Bug Tracker - Manage Project Users</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Manage Project Users - {project ? project.name : ''}</h1>

                <div className="manage-project-users-grid">

                    <RemoveUsers project={project} />
                    <AddUsers project={project} />

                </div>
                
            </div>
        </>
    )
}

export default ManageProjectUsers;