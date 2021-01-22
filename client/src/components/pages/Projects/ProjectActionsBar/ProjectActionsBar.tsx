import React, { useEffect } from 'react'

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Icon
import { FaPlus } from 'react-icons/fa';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Types
import { IProjectStore, Iuser, IUsersStore } from '../../../../types';

// Import Styling
import './ProjectActionsBar.scss';

// Props Interface
interface PropsI {
    usersStore?: IUsersStore,
    projectStore?: IProjectStore
}

let ProjectActionsBar = ({ usersStore, projectStore }: PropsI) => {
    
    useEffect(() => {
        usersStore!.fetchUsers();
    }, [usersStore]);

    const sortByOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        projectStore!.setProjectSort(e.target.value);
    }

    return (
        <div className="project-actions-bar">
            
            <label htmlFor="sort-select">Sort By</label>

            <select className="sort-select" id="sort-select" onChange={sortByOnChange}>

                <option value="a-z">Name (A-Z)</option>
                <option value="z-a">Name (Z-A)</option>
                
                <option value="owner-a-z">Owner (A-Z)</option>
                <option value="owner-z-a">Owner (Z-A)</option>

            </select>

            <label htmlFor="owner-filter">Filter by Owner</label>

            <select id="owner-filter">

                <option value="all">All</option>
                        
                {usersStore!.userCount === 0 ? '' : usersStore!.users.map((user: Iuser) => {
                        
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

// Inject Store
ProjectActionsBar = inject("usersStore", "projectStore")(observer(ProjectActionsBar));

export default ProjectActionsBar;
