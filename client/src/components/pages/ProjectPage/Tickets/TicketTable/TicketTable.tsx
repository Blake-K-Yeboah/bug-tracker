import React from 'react'

// Import Stylesheet
import './TicketTable.scss'

// Import types
import { Iticket } from '../../../../../types'

// Import Compoennts
import TableRow from './TableRow'

// Prop Interface
interface PropsI {
    tickets: Iticket[]
}

const TicketTable = ({ tickets }: PropsI) => {

    return (
        <>
            {tickets.length !== 0 ? 
            <table className="ticket-table">
                
                <thead>

                    <tr className="head-row">
                        <th className="t-head">
                            Text
                        </th>
                        <th className="t-head">
                            Owner
                        </th>
                        <th className="t-head">
                            Status
                        </th>
                        <th className="t-head">
                            View
                        </th>
                    </tr>

                </thead>

                <tbody>

                    {tickets.map((ticket) => {

                        return <TableRow ticket={ticket} key={ticket._id} />

                    })}

                </tbody>

            </table>
            : <p style={{marginLeft: '1.75em'}}>No Tickets</p> }
        </>
    )
}

export default TicketTable
