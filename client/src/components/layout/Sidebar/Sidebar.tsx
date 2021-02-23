import React, { useState } from 'react'

// Import Styling
import './Sidebar.scss';

// Import Store Props type
import { IAuthStore } from '../../../types';

// Import inject and observer for authStore access
import { inject, observer } from 'mobx-react';

// Import Link COmponent
import Link from './Link';

// Import Icons
import { FaClipboardList, FaUsersCog, FaFolderPlus, FaTags, FaHistory, FaFolderOpen } from 'react-icons/fa';

// Props Interface
interface PropsI {
    authStore?: IAuthStore
}

let Sidebar = ({ authStore }: PropsI) => {

    const firstname: string = authStore && authStore.user ? authStore.user.name.split(' ')[0] : '';

    const userRole: string = authStore && authStore.user ? authStore.user.role : '';

    const manageUserRolesLink: JSX.Element = (
        <Link route="/manage-user-roles" text="Manage User Roles">
            <FaUsersCog className="icon" />
        </Link>
    )

    const manageProjectUsersLink: JSX.Element = (
        <Link route="/manage-projects-users" text="Manage Projects Users">
            <FaFolderPlus className="icon" />
        </Link>
    )

    const year: number = new Date().getFullYear();
    
    const [mobileShow, setMobileShow] = useState<boolean>(false);

    return (
        <div className={`sidebar ${mobileShow ? 'shown' : ''}`}>

            <h3 className="sidebar-toggler" onClick={() => setMobileShow(!mobileShow)}>{mobileShow ? '< CLOSE SIDEBAR' : 'OPEN SIDEBAR >'}</h3>

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

                <Link route="/projects" text="My Projects">
                    <FaFolderOpen className="icon" />
                </Link>

                <Link route="/tickets" text="My Tickets">
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

// Inject Store
Sidebar = inject('authStore')(observer(Sidebar));

export default Sidebar
