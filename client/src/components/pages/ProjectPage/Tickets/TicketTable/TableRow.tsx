import React, { useState, useEffect } from 'react'

// Import Axios
import Axios from 'axios';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Types
import { Iticket, Iuser } from '../../../../../types';

// Props Interface
interface PropsI {
    ticket: Iticket
}

const TableRow = ({ ticket }: PropsI) => {

    const [user, setUser] = useState<Iuser | null>(null);

    useEffect(() => {
        
        // Fetch Ticket Owner
        const fetchOwner = async () => {
            const res = await Axios.get(`/api/users/${ticket.owner}`);
            setUser(res.data);
        }

        fetchOwner();
    }, [ticket.owner]);

    return (
        <tr className="table-row">
            <td className="t-data text">{ticket.text}</td>
            <td className="t-data owner">
                {user ? <>
                    <img src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" className="profile-pic" />
                    <NavLink to={`/profile/${user._id}`} className="name">{user.name}</NavLink>
                </> : <div className="spacer">aaaaaaaaaaaaaaaa.</div>}
            </td>
            <td className="t-data status">
                <div className={`container ${ticket.status}`}>
                    <span>{ticket.status === "in-progress" ? 'In Progress' : ticket.status === "not-started" ? 'Not Started' : ticket.status === "completed" ? 'Completed' : ''}</span>
                </div>
            </td>
            <td className="t-data view">
                
                <NavLink to={`/ticket/${ticket._id}`}>
                    <button className="btn view-btn primary">View</button>
                </NavLink>
                
            </td>
        </tr>
    )
}

export default TableRow
