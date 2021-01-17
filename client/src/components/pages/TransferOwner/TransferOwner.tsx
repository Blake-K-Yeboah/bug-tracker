import React, { useEffect, useState } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import TransferOwnerContainer from './TransferOwnerContainer/TransferOwnerContainer';

// Import Axios
import Axios from 'axios';

const TransferOwner: any = ({ match: { params: { id }} }: any) => {

    const [project, setProject] = useState(null);

    useEffect(() => {
        Axios.get(`/api/projects/${id}`).then(res => {
            setProject(res.data);
        });
    }, [id]);

    return (
        <>
            <Helmet>

                <title>Bug Tracker - Transfer Owner</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <TransferOwnerContainer project={project} />

            </div>

        </>
    )
}

export default TransferOwner;
