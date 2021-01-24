import React, { useEffect } from 'react'

// Import Styling
import './Tickets.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { Iproject, Iticket, ITicketStore } from '../../../../types';

// Import Components
import TicketTable from './TicketTable/TicketTable';

// Import Icons
import { FaPlus } from 'react-icons/fa';

// Props Interface
interface PropsI {
    project: Iproject | null,
    ticketStore?: ITicketStore
}

let Tickets = ({ project, ticketStore }: PropsI) => {

    useEffect(() => {
        ticketStore!.fetchTickets();
    }, [ticketStore]);

    const tickets = ticketStore!.tickets.length > 0 && project ? ticketStore!.tickets.filter((ticket: Iticket) => ticket.projectId === project._id) : [];

    return (

        <div className="ticket-section">

            {project && tickets ? <>
            
                <h2 className="title">Tickets ({tickets.length})</h2>
                
                <TicketTable tickets={tickets}/>
                
                <button className="btn primary add-btn"><FaPlus className="icon" /></button>

            </> : <>
                
                <div className="loader title"></div>
                <div className="loader ticket"></div>
                <div className="loader ticket"></div>
                <div className="loader ticket"></div>
                <div className="loader ticket"></div>
            
            </>}

        </div>

    )

}

// Inject Store
Tickets = inject('ticketStore')(observer(Tickets));

export default Tickets
