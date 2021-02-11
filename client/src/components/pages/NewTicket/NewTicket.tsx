import React from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import NewTicketContainer from './NewTicketContainer/NewTicketContainer';

// Import Type
import { RouteComponentProps } from 'react-router-dom';

const NewTicket: React.FC<RouteComponentProps> = () => {

    return (
        <>
            <Helmet>

                <title>Bug Tracker - New Ticket</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <NewTicketContainer />

            </div>

        </>
    )
}

export default NewTicket;
