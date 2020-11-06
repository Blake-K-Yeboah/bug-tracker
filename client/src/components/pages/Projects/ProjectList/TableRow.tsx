import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const TableRow = ({ project }: any ) => {

    const [owner, setOwner] = useState({ profileIcon: '', name: '', _id: '' });

    useEffect(() => {

        Axios.get(`/api/users/${project.owner}`).then((res) => {
            setOwner(res.data);
        }).catch(err => {
            console.error(err);
        });

    }, [project.owner]);

    return (
        <tr className="row">
            <td className="table-data">
                {project.name}
            </td>
            <td className="table-data">
                {project.description}
            </td>
            <td className="table-data owner-td">
                {owner !== { profileIcon: '', name: '', _id: '' } ? <><img src={`${process.env.PUBLIC_URL}/uploads/profile/${owner.profileIcon}`} className="profileIcon" alt="Profile Icon" /><NavLink className="name" to={`/profile/${owner._id}`}>{owner.name}</NavLink></> : ''}
            </td>
            <td className="table-data">
                <NavLink className="btn-container" to={`/project/${project._id}`}>
                    <button className="btn primary">View Project</button>
                </NavLink>
            </td>
        </tr>
    )

}

export default TableRow
