import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { IStoreProps, Iuser } from '../../../../types';

// Import Styling
import './ProjectActionsBar.scss';

let ProjectActionsBar = ({ usersStore, projectStore }: IStoreProps) => {
    
    useEffect(() => {
        usersStore.fetchUsers();
    }, [usersStore]);

    const sortByOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        projectStore.setProjectSort(e.target.value);
    }

    return (
        <div className="project-actions-bar">
            
            <label htmlFor="sort-select">Sort By</label>

            <select className="sort-select" id="sort-select" onChange={sortByOnChange}>

                <option value="a-z">Name (A-Z)</option>
                <option value="z-a">Name (Z-A)</option>
                <option value="newest-first">Newest First</option>
                <option value="oldest-first">Oldest First</option>

            </select>

            <label htmlFor="owner-filter">Filter by Owner</label>

            <select id="owner-filter">

                <option value="all">All</option>
                        
                {usersStore.userCount === 0 ? '' : usersStore.users.map((user: Iuser) => {
                        
                    if (user.role === "project-manager" || user.role === "admin") {
                        return (
                            <option value={user.name} key={user._id}>{user.name}</option>
                        )
                    } else {
                        return ''
                    }

                })}

            </select>

            <div className="new-project-section">

                <NavLink className="btn-container" to="/projects/new">

                    <button className="btn primary has-icon">Create New Project <FaPlus className="icon" /></button>

                </NavLink>
                
            </div>

        </div>
    )
}

ProjectActionsBar = inject("usersStore", "projectStore")(observer(ProjectActionsBar));

export default ProjectActionsBar;
