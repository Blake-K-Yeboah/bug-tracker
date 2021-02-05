import React, { useEffect } from 'react'

// Import Styling
import './TicketsChart.scss';

// Import Chart Component
// @ts-ignore 
import PieChart from 'react-simple-pie-chart';

// Import Types
import { IAuthStore, ITicketStore } from '../../../../types';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Components
import Legend from './Legend/Legend';

interface PropsI {
    ticketStore?: ITicketStore,
    authStore?: IAuthStore
}

let TicketsChart = ({ ticketStore, authStore }: PropsI) => {

    useEffect(() => {
        ticketStore?.fetchTickets();
    }, [ticketStore]);

    const activeTickets = !ticketStore?.tickets ? [] : ticketStore?.tickets.filter(ticket => ticket.owner === authStore?.user.id);

    const chartValues = {
        notStarted: activeTickets.filter(ticket => ticket.status === 'not-started').length,
        inProgress: activeTickets.filter(ticket => ticket.status === 'in-progress').length,
        completed: activeTickets.filter(ticket => ticket.status === 'completed').length
    };

    return (
        <div className="tickets-chart-section">
            
            <h2 className="heading">Tickets Chart</h2>

            <Legend values={chartValues} />

            <div className="chart-container">

                <PieChart
                    slices={[
                        {
                        color: '#DF4747',
                        value: chartValues.notStarted, // Not Started
                        },
                        {
                        color: '#FFCA2C',
                        value: chartValues.inProgress, // In Progress
                        },
                        {
                        color: '#10AF05',
                        value: chartValues.completed, // Completed
                        }
                    ]}
                />

            </div>

        </div>
    )
}

TicketsChart = inject("ticketStore", "authStore")(observer(TicketsChart));

export default TicketsChart
