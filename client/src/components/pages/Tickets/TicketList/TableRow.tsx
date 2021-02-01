import React, { useEffect, useState } from 'react'

// Import Types
import { Iticket } from '../../../../types'

// Import Axios
import axios from 'axios';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Props Interface
interface PropsI {
    ticket: Iticket
}

const TableRow = ({ ticket }: PropsI) => {

    const [projectName, setProjectName] = useState<string>('Loading');

    useEffect(() => {

        // Fetch Project
        const fetchProject = async () => {
            const res = await axios.get(`/api/projects/${ticket.projectId}`);
            setProjectName(res.data.name);
        }

        fetchProject();

    }, [ticket.projectId]);

    return (
        <tr className="table-row">
            <td className="t-data text">{ticket.text}</td>
            <td className="t-data project">{projectName}</td>
            <td className="t-data status">
                <div className={`container ${ticket.status}`}>
                    <span>{ticket.status === "in-progress" ? 'In Progress' : ticket.status === "not-started" ? 'Not Started' : ticket.status === "completed" ? 'Completed' : ''}</span>
                </div>
            </td>
            <td className="t-data actions">
                <NavLink to={`/ticket/${ticket._id}`}>
                    <button className="view-btn btn primary">View</button>
                </NavLink>
                <NavLink to={`/ticket/${ticket._id}/edit`}>
                    <button className="edit-btn btn warning">Edit</button>
                </NavLink>
            </td>
        </tr>
    )
}

export default TableRow
