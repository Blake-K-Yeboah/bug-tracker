import React, { useEffect, useState } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import TransferOwnerContainer from './TransferOwnerContainer/TransferOwnerContainer';

// Import Axios
import Axios from 'axios';

// Import Types
import { Iproject } from '../../../types';

// Props Interface
interface PropsI {
    match: { params: { id: string }}
}

const TransferOwner = ({ match: { params: { id }} }: PropsI) => {

    const [project, setProject] = useState<Iproject | null>(null);

    useEffect(() => {

        // Fetch Project
        const fetchProject = async () => {
            const res = await Axios.get(`/api/projects/${id}`);
            setProject(res.data);
        }

        fetchProject()
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
