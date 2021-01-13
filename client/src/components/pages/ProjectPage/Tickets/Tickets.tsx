import React, { useEffect } from 'react'

// Import Styling
import './Tickets.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { IStoreProps, Iticket } from '../../../../types';

// Import Components
import TicketTable from './TicketTable/TicketTable';

let Tickets = ({ project, ticketStore }: IStoreProps) => {

    useEffect(() => {
        ticketStore.fetchTickets();
    }, [ticketStore]);

    const tickets: Iticket[] = ticketStore.tickets.length > 0 && project ? ticketStore.tickets.filter((ticket: Iticket) => ticket.projectId === project._id) : [];

    return (

        <div className="ticket-section">

            <h2 className="title">Tickets ({tickets.length})</h2>
            
            <TicketTable tickets={tickets}/>

        </div>

    )

}

Tickets = inject('ticketStore')(observer(Tickets));

export default Tickets
