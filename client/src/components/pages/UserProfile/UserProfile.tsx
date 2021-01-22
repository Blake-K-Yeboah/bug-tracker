import React, { useEffect, useState } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import ProfileInfo from './ProfileInfo/ProfileInfo';

// Import Axios
import Axios from 'axios';

// Import Styling
import './UserProfile.scss';

// Import Types
import { Iuser } from '../../../types';

// Props Interface
interface PropsI {
    match: { params: { id: string }}
}

const UserProfile = ({ match: { params: { id }}}: PropsI) => {

    const userId = id;

    const [user, setUser] = useState<Iuser | null>(null);

    useEffect(() => {

        // Fetch User
        const fetchUser = async () => {
            const res = await Axios.get(`/api/users/${userId}`);
            setUser(res.data);
        }

        fetchUser();

    }, [userId]);

    return (
        <>
            <Helmet>

                <title>{user ? `Bug Tracker - ${user.name}` : 'Loading'}</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">User Profile</h1>
                
                <div className="user-profile-grid">

                    <ProfileInfo user={user} />
                    
                    <div className="placeholder"></div>

                </div>

            </div>

        </>
    )
}

export default UserProfile
