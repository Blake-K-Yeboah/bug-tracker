import Axios from 'axios';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { IStoreProps } from '../../../../types';

let TableRow = ({ project, projectStore }: IStoreProps ) => {

    const [owner, setOwner] = useState({ profileIcon: '', name: '', _id: '' });

    useEffect(() => {
        let _isMounted = true;

        if (_isMounted) {

            Axios.get(`/api/users/${project.owner}`).then(res => {
                setOwner(res.data);
            }).catch(err => {
                console.error(err);
            });
        
        }

    }, [project.owner]);

    const deleteHandler = () => {
        Axios.delete(`/api/projects/${project._id}`).then(res => {
            projectStore.fetchProjects();
            window.location.reload();
        }).catch(err => {
            alert('An Error Occured');
        });
    };

    return (
        <tr className="row">
            <td className="table-data">
                {project.name}
            </td>
            <td className="table-data">
                {project.description}
            </td>
            <td className="table-data owner-td">
                {owner !== { profileIcon: '', name: '', _id: '' } ? <>
                    <img src={`${process.env.PUBLIC_URL}/uploads/profile/${owner.profileIcon}`} className="profileIcon" alt="Profile Icon" />
                    <NavLink className="name" to={`/profile/${owner._id}`}>{owner.name}</NavLink> </> 
                : ''}
            </td>
            <td className="table-data">
                <NavLink className="btn-link-container" to={`/project/${project._id}`}>
                    <button className="btn primary">View Project</button>
                </NavLink>
                <button className="btn danger" onClick={deleteHandler}>Delete Project</button>
            </td>
        </tr>
    )

}

TableRow = inject('projectStore')(observer(TableRow));

export default TableRow
