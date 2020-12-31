import React from 'react'

// Import Styling
import './Sidebar.scss';

// Import Store Props type
import { IStoreProps } from '../../../types';

// Import inject and observer for authStore access
import { inject, observer } from 'mobx-react';

// Import Link COmponent
import Link from './Link';

// Import Icons
import { FaClipboardList, FaUsersCog, FaFolderPlus, FaTags, FaHistory, FaFolderOpen } from 'react-icons/fa';

let Sidebar = ({ authStore }: IStoreProps) => {

    const firstname: string = authStore.user ? authStore.user.name.split(' ')[0] : '';

    const userRole: string = authStore.user ? authStore.user.role : '';

    const manageUserRolesLink = (
        <Link route="/manage-user-roles" text="Manage User Roles">
            <FaUsersCog className="icon" />
        </Link>
    )

    const manageProjectUsersLink = (
        <Link route="/manage-projects-users" text="Manage Projects Users">
            <FaFolderPlus className="icon" />
        </Link>
    )

    const year = new Date().getFullYear();

    return (
        <div className="sidebar">

            <div className="sidebar-brand">

                <h1 className="sidebar-brand-heading">
                    Welcome, {firstname as string}!
                </h1>

            </div>

            <ul className="links-list">

                <Link route="/dashboard" text="Dashboard">
                    <FaClipboardList className="icon" />
                </Link>

                {userRole === "admin" ? manageUserRolesLink : ''}
                {userRole === "admin" || userRole === "project-manager" ? manageProjectUsersLink : ''}

                <Link route="/projects" text="Projects">
                    <FaFolderOpen className="icon" />
                </Link>

                <Link route="/tickets" text="Tickets">
                    <FaTags className="icon" />
                </Link>

                <Link route="/history" text="History">
                    <FaHistory className="icon" />
                </Link>

            </ul>

            <p className="small-text">&copy; Copyright {year as number} Bug Tracker</p>

            <p className="small-text">
                Built by <a href="https://www.blakeyeboah.com/" className="link" target="_blank" rel="noopener noreferrer">Blake Yeboah</a>
            </p>

        </div>
    )
}

Sidebar = inject('authStore')(observer(Sidebar));

export default Sidebar
