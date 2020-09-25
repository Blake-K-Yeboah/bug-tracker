import React from 'react'

const TableRow = ({ user }: any) => {
    const date = new Date(user.createdOn);

    return (
        <tr className="row">
            <td className="table-data">
                {user.name}
            </td>
            <td className="table-data">
                {user.email}
            </td>
            <td className="table-data">
                {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </td>
        </tr>
    )
}

export default TableRow
