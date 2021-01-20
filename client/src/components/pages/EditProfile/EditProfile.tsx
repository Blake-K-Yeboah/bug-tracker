import React, { useState, useEffect } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Styling
import './EditProfile.scss';

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import EditDetails from '../EditProfile/EditDetails/EditDetails';

// Import Axios
import Axios from 'axios';

// Import NavLink
import { NavLink } from 'react-router-dom';

const EditProfile = ({ match: { params: { id }}}: any) => {
    
    const [user, setUser]: any = useState(null);

    useEffect(() => {

        Axios.get(`/api/users/${id}`).then(res => {
            setUser(res.data);
        });

    }, [id]);

    
    return (
        <>
            <Helmet>

                <title>Bug Tracker - Edit User Profile</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Editing User Profile - {user ? user.name : ''}</h1>
                
                <div className="edit-profile-page-grid">

                    <EditDetails user={user} />
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>

                </div>

                <NavLink to={`/profile/${id}`} className="page-link">&lt; Back to profile</NavLink>
                
            </div>

        </>
    )

}

export default EditProfile