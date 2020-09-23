import React from 'react'

// Import Styling
import './Dropdown.scss';
import { IStoreProps } from '../../../../../types';

// Import MobX stuff
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

let Dropdown = ({ display, authStore }: IStoreProps) => {
    console.log(display)

    return (
        <div className={`dropdown ${!display ? 'hidden' : ''}`}>

            <div className="heading-container">

                {authStore.user ? <img src={`${process.env.PUBLIC_URL}/uploads/profile/${authStore.user.profileIcon}`} alt="Profile Icon" className="heading-img" /> : ''}

                <h3 className="heading-text">{authStore.user ? authStore.user.name : 'Loading'}</h3>

            </div>

            <NavLink to={`/profile/${authStore.user.id}`} className="link" >View Profile</NavLink>

            <NavLink to={`/profile/${authStore.user.id}/edit`} className="link" >Edit Profile</NavLink>

            <button className="btn danger">Log Out</button>

        </div>
    )
}

Dropdown = inject("authStore")(observer(Dropdown));

export default Dropdown
