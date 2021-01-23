import React, { useState, useEffect } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Styling
import './EditProfile.scss';

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import EditDetails from '../EditProfile/EditDetails/EditDetails';
import UploadProfilePic from './UploadProfilePic/UploadProfilePic';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import UserHistory from './UserHistory/UserHistory';

// Import Axios
import Axios from 'axios';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Types
import { Iuser } from '../../../types';

// Props Interface
interface PropsI {
    match: {
        params: {
            id: string
        }
    }
}

const EditProfile = ({ match: { params: { id }}}: PropsI) => {
    
    const [user, setUser] = useState<Iuser | null>(null);

    useEffect(() => {

        // Fetch User
        const fetchUser = async () => {
            const res = await Axios.get(`/api/users/${id}`);
            setUser(res.data);   
        }

        fetchUser();

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
                    <UploadProfilePic user={user} />
                    <DeleteAccount user={user} />
                    <UserHistory user={user} />

                </div>

                <NavLink to={`/profile/${id}`} className="page-link">&lt; Back to profile</NavLink>
                
            </div>

        </>
    )

}

export default EditProfile