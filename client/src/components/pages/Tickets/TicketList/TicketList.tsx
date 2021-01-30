import React from 'react'

// Import Styling
import './TicketList.scss';

// Import Types
import { ITicketStore } from '../../../../types';

// Import mobX Stuff
import { inject, observer } from 'mobx-react';

// Props Interface
interface PropsI {
    ticketStore?: ITicketStore
}

let TicketList = ({ ticketStore }: PropsI) => {
    return (
        <ul className="ticket-list">
            <h2 className="heading">Tickets</h2>
        </ul>
    )
}

TicketList = inject('ticketStore')(observer(TicketList));

export default TicketList
