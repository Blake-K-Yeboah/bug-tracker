import React from 'react'

// Import Types
import { IChange } from '../../../../types'
import ListItem from '../../Dashboard/LatestActivity/LatestActivityList/ListItem/ListItem';

// Props Interface
interface PropsI {
    change: IChange
}

const TableRow = ({ change }: PropsI) => {

    // Convert Change Date To Date Object to adjust formatting
    const date: Date = new Date(change.date);

    // Define Days + Months to convert number returned from Date get methods to strings
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Store formatting of date to display in table
    const dateDisplay: string = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}:${date.getSeconds()}`;

    return (
        <tr className="row">
            <td className="list-item-td">
                <ListItem change={change} />
            </td>
            <td className="date">{dateDisplay}</td>
        </tr>
    )
}

export default TableRow
