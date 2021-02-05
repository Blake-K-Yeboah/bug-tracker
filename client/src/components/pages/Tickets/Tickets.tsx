import React from 'react'

// Import Styling
import './Tickets.scss'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import TicketList from './TicketList/TicketList';
import TicketsChart from './TicketsChart/TicketsChart';

// Import Types
import { RouteComponentProps } from 'react-router-dom';

const Tickets: React.FC<RouteComponentProps> = () => {

    return (
        <>
            <Helmet>

                <title>Bug Tracker - Tickets</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">My Tickets</h1>

                <div className="tickets-grid">
                    
                    <TicketList />

                    <TicketsChart />

                </div>

            </div>
            
        </>
    )
}

export default Tickets
