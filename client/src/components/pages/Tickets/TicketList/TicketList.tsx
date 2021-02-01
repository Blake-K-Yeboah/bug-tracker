import React, { useEffect } from 'react'

// Import Styling
import './TicketList.scss';

// Import Types
import { IAuthStore, ITicketStore } from '../../../../types';

// Import mobX Stuff
import { inject, observer } from 'mobx-react';
import TableRow from './TableRow';

// Props Interface
interface PropsI {
    ticketStore?: ITicketStore,
    authStore?: IAuthStore
}

let TicketList = ({ ticketStore, authStore }: PropsI) => {

    useEffect(() => {
        ticketStore?.fetchTickets();
    }, [ticketStore]);

    const activeTickets = !ticketStore?.tickets ? [] : ticketStore?.tickets.filter(ticket => ticket.owner === authStore?.user.id);

    return (
        <ul className="ticket-list">
            
            <h2 className="heading">Tickets</h2>

            <table className="tickets-table">

                <thead>

                    <tr className="head-row">

                        <th className="t-head">
                            Text
                        </th>
                        <th className="t-head">
                            Project
                        </th>
                        <th className="t-head">
                            Status
                        </th>
                        <th className="t-head">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {activeTickets.map((ticket) => {

                        return <TableRow ticket={ticket} />

                    })}

                </tbody>
            </table>

        </ul>
    )
}

// Inject Stores
TicketList = inject('ticketStore', 'authStore')(observer(TicketList));

export default TicketList
