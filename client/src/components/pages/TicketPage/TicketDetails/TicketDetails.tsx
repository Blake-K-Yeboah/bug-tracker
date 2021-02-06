import React, { useEffect, useState } from 'react';

// Import Styling
import './TicketDetails.scss';

// Import Icon
import { FaPen } from 'react-icons/fa';

// Import NavLink Component
import { NavLink } from 'react-router-dom';

// Import Types
import { Iticket } from '../../../../types';

// Import Axios
import Axios from 'axios';

// Props Interface
interface PropsI {
    ticket: Iticket | null
}

const TicketDetails = ({ ticket }: PropsI) => {

    const [ownerName, setOwnerName] = useState<string>('');

    useEffect(() => {

        // Fetch Owner
        const fetchOwner = async () => {
            const res = await Axios.get(`/api/users/${ticket?.owner}`);
            setOwnerName(res.data.name);
        }

        if (ticket) fetchOwner();

    }, [ticket]);

    const priority = ticket && ticket.priority === 1 ? { text: "Not Important", className: 'not-important' } 
                     : ticket && ticket.priority === 2 ? { text: "Semi Important", className: 'semi-important' }
                     : ticket && ticket.priority === 3 ? { text: "Important", className: 'important' }
                     : null;
    
    const status = ticket && ticket.status === 'not-started' ? { text: "Not Started", className: 'not-started' } 
                     : ticket && ticket.status === 'completed' ? { text: "Completed", className: 'completed' }
                     : ticket && ticket.status === 'in-progress' ? { text: "In Progress", className: 'in-progress' }
                     : null;

    const date = ticket ? new Date(ticket.createdOn) : null;

    return (
        <div className="ticket-details">

            {ticket ? <>     

                <h2 className="heading">Ticket Details</h2>

                <span className="detail"><b>Text</b>: {ticket.text}</span>
                <span className="detail"><b>Owner</b>: {ownerName}</span>
                <span className="detail inline"><b>Priority</b>: {priority ? <div className={`${priority.className} priority-div`}>{priority.text}</div> : ''}</span>
                <span className="detail inline"><b>Status</b>: {status ? <div className={`${status.className} priority-div`}>{status.text}</div> : ''}</span>
                <span className="detail"><b>Created On:</b>: { date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : ''}</span>

                <NavLink to={`/ticket/${ticket._id}/edit`}>
                    <button className="btn primary has-icon edit-btn">
                        <FaPen className="icon" />
                    </button>
                </NavLink>

            </> : <>
            
            <div className="loader title"></div>
            <div className="loader edit"></div>
            <div className="loader detail"></div>
            <div className="loader detail"></div>
            <div className="loader detail"></div>

        </>}

        </div>
    )
}

export default TicketDetails
