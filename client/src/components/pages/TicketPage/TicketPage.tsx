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
import { Iticket } from '../../../types';

// Props Interface
interface PropsI {
    match: { params: { id: string }}
}

const TicketPage = ({ match: { params: { id }} }: PropsI) => {

    const ticketId = id;

    const [ticket, setTicket] = useState<Iticket | null>(null);

    useEffect(() => {

        // Fetch Ticket
        const fetchTicket = async () => {
            const res = await Axios.get(`/api/tickets/${ticketId}`);
            setTicket(res.data)
        }
        fetchTicket()

    }, [ticketId]);

    return (
        <>
            <Helmet>

                <title>{ticket ? `Bug Tracker - Ticket: ${ticket.text}` : 'Loading'}</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Ticket</h1>
                
                <div className="ticket-page-grid">
                    
                    <TicketDetails ticket={ticket} />
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>

                </div>
                
            </div>

        </>
    )
}

export default TicketPage
