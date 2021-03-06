import React, { useEffect } from 'react'

// Import Styling
import './Details.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { Iproject, Iticket, ITicketStore, Iuser, IUsersStore } from '../../../../types';

// Import Icon
import { FaPen } from 'react-icons/fa';

// Import NavLink Component
import { NavLink } from 'react-router-dom';

// Props Interface
interface PropsI {
    project: Iproject | null,
    usersStore?: IUsersStore,
    ticketStore?: ITicketStore
}

let Details = ({ project, usersStore, ticketStore }: PropsI) => {

    useEffect(() => {
        usersStore!.fetchUsers();
        ticketStore!.fetchTickets();
    }, [usersStore, ticketStore]);

    const ownerName = project && usersStore!.users.length > 0 ? usersStore!.users.filter((user: Iuser) => user._id === project.owner)[0].name : '';

    const date: Date | null = project ? new Date(project.createdOn) : null;

    return (
        <div className="project-details">
            {project ? <>

                <h2 className="project-title">&#39;{project.name}&#39; Details</h2>
                <span className="project-detail"><b>Description</b>: {project.description}</span>
                <span className="project-detail"><b>Owner</b>: {ownerName}</span>
                <span className="project-detail"><b>Created On</b>: { date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : ''}</span>
                <span className="project-detail"><b>User Count</b>: {project.usersList.length + 1}</span>
                <span className="project-detail"><b>Ticket Count</b>: {ticketStore!.tickets.filter((ticket: Iticket) => ticket.projectId === project._id).length}</span>
                
                <NavLink to={`/project/${project._id}/edit`}>
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

// Inject Store
Details = inject('usersStore', 'ticketStore')(observer(Details));

export default Details
