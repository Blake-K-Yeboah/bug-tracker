import React from 'react'

// Import Styling
import './Dropdown.scss';
import { IStoreProps } from '../../../../types';

// Import MobX stuff
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import Axios from 'axios';

let Dropdown = ({ display, authStore }: IStoreProps) => {

    let history = useHistory();

    const logOutHandler = () => {

        let currentDate = new Date();

        currentDate.setMonth(currentDate.getMonth() - 1);

        document.cookie = `jwtToken=; expires= ${currentDate}`;

        delete Axios.defaults.headers.common["Authorization"];

        authStore.setCurrentUser(null);

        history.push('/login');
    }

    return (
        <div className={`dropdown ${!display ? 'hidden' : ''}`}>

            <div className="heading-container">

                {authStore.user ? <img src={`${process.env.PUBLIC_URL}/uploads/profile/${authStore.user.profileIcon}`} alt="Profile Icon" className="heading-img" /> : ''}

                <h3 className="heading-text">{authStore.user ? authStore.user.name : 'Loading'}</h3>

            </div>

            <NavLink to={`/profile/${authStore.user.id}`} className="link" >View Profile</NavLink>

            <NavLink to={`/profile/${authStore.user.id}/edit`} className="link" >Edit Profile</NavLink>

            <button className="btn danger" onClick={logOutHandler}>Log Out</button>

        </div>
    )
}

Dropdown = inject("authStore")(observer(Dropdown));

export default Dropdown
