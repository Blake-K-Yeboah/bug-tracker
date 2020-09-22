import React from 'react'
import './Sidebar.scss';
import { IStoreProps } from '../../../../types';
import { inject, observer } from 'mobx-react';
import Link from './Link';
import { FaClipboardList, FaUsersCog, FaFolderPlus, FaTags, FaHistory, FaFolderOpen } from 'react-icons/fa';

let Sidebar = ({ authStore }: IStoreProps) => {

    const firstname: string = authStore.user ? authStore.user.name.split(' ')[0] : '';

    const userRole: string = authStore.user ? authStore.user.role : '';
    console.log(userRole);

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

    return (
        <div className="sidebar">

            <div className="sidebar-brand">

                {authStore.user ? <img src={`${process.env.PUBLIC_URL}/uploads/profile/${authStore.user.profileIcon}`} alt="Profile Icon" className="sidebar-brand-img" /> : ''}

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

            <p className="copyright-text">&copy; Copyright 2020</p>
        </div>
    )
}

Sidebar = inject('authStore')(observer(Sidebar));

export default Sidebar
