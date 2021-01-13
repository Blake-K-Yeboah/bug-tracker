import React, { useState, useEffect } from 'react'

// Import Axios
import Axios from 'axios';

const TableRow = ({ ticket }: any) => {

    const [user, setUser]: any = useState(null);

    useEffect(() => {
        
        Axios.get(`/api/users/${ticket.owner}`).then(res => {
            setUser(res.data);
        });

    }, [ticket.owner]);

    return (
        <tr className="table-row">
            <td className="t-data">{ticket.text}</td>
            <td className="t-data owner">
                {user ? <>
                    <img src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" className="profile-pic" />
                    <span className="name">{user.name}</span>
                </> : 'Loading'}
            </td>
            <td className="t-data status">
                <div className={`container ${ticket.status}`}>
                    <span>{ticket.status === "in-progress" ? 'In Progress' : ticket.status === "not-started" ? 'Not Started' : ticket.status === "completed" ? 'Completed' : ''}</span>
                </div>
            </td>
        </tr>
    )
}

export default TableRow
