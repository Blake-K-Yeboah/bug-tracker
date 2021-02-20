import React, { useEffect, useState } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet';

// Import Components
import Navbar from '../../layout/Navbar/Navbar';
import Sidebar from '../../layout/Sidebar/Sidebar';
import UpdateDetailsOne from './UpdateDetailsOne/UpdateDetailsOne';
import UpdateDetailsTwo from './UpdateDetailsTwo/UpdateDetailsTwo';
import DangerZone from './DangerZone/DangerZone';

// Import Styling
import './EditTicket.scss';

// Import Types
import { Iproject, Iticket } from '../../../types';

// Import Axios
import Axios from 'axios';
import Details from '../ProjectPage/Details/Details';

// Props Interface
interface PropsI {
   match: {
       params: {
           id: string
       }
   }
}

const EditTicket = ({ match: { params: { id }}}: PropsI) => {

    const [ticket, setTicket] = useState<Iticket | null>(null);
    const [project, setProject] = useState<Iproject | null>(null);

    useEffect(() => {

        // Fetch Project And Ticket
        const fetchProjectAndTicket = async () => {

            const res = await Axios.get(`/api/tickets/${id}`);
            setTicket(res.data);

            const projectRes = await Axios.get(`/api/projects/${res.data.projectId}`);
            setProject(projectRes.data);

        }

        fetchProjectAndTicket();
        

    }, [id]);

    return (
        <>

            <Helmet>

                <title>Bug Tracker - Edit Ticket</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Editing Ticket "{ticket ? ticket.text : 'Loading'}"</h1>

                <div className="edit-ticket-page-grid">

                    <UpdateDetailsOne ticket={ticket} />
                    <UpdateDetailsTwo ticket={ticket} />
                    <DangerZone ticket={ticket} />
                    <Details project={project} />

                </div>

            </div>

        </>
    )
}

export default EditTicket
