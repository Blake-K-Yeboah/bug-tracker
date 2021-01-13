import React from 'react'

// Import Stylesheet
import './TicketTable.scss'

// Import types
import { Iticket } from '../../../../../types'

// Import Compoennts
import TableRow from './TableRow'

const TicketTable = ({ tickets }: any) => {

    return (
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

                {tickets.map((ticket: Iticket) => {

                    return <TableRow ticket={ticket} key={ticket._id} />

                })}

            </tbody>

        </table>
    )
}

export default TicketTable
