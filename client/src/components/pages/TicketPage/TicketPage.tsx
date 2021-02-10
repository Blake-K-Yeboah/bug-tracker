import React, { useState, useEffect } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';

// Import Axios
import Axios from 'axios';
import TicketDetails from './TicketDetails/TicketDetails';

// Import Styling
import './TicketPage.scss';

// Import Types
import { Iproject, Iticket } from '../../../types';
import Comments from './Comments/Comments';
import Details from '../ProjectPage/Details/Details';
import AssignedUsers from '../ProjectPage/AssignedUsers/AssignedUsers';

// Props Interface
interface PropsI {
    match: { params: { id: string }}
}

const TicketPage = ({ match: { params: { id }} }: PropsI) => {

    const ticketId = id;

    const [ticket, setTicket] = useState<Iticket | null>(null);
    const [project, setProject] = useState<Iproject | null>(null);

    useEffect(() => {

        // Fetch Ticket And Project
        const fetchTicketAndProject = async () => {
            const ticketRes = await Axios.get(`/api/tickets/${ticketId}`);
            setTicket(ticketRes.data);

            const projectRes = await Axios.get(`/api/projects/${ticketRes.data.projectId}`);
            setProject(projectRes.data);
        }
        
        fetchTicketAndProject();

    }, [ticketId]);

    return (
        <>
            <Helmet>

                <title>{ticket ? `Bug Tracker - Ticket For ${project ? project.name : 'Loading'}` : ''}</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Ticket For {project ? project.name : 'Loading'}</h1>
                
                <div className="ticket-page-grid">
                    
                    <TicketDetails ticket={ticket} />
                    <Comments ticket={ticket} />
                    <Details project={project} />
                    <AssignedUsers project={project} />

                </div>
                
            </div>

        </>
    )
}

export default TicketPage
