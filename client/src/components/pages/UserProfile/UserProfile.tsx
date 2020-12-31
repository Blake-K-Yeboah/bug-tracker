import React, { useEffect, useState } from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';

// Import Axios
import Axios from 'axios';

// Import Styling
import './UserProfile.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const UserProfile: any = ({ match }: any) => {

    const userId = match.params.id;

    const [user, setUser]: any = useState(null);

    useEffect(() => {

        Axios.get(`/api/users/${userId}`).then(res => {
            setUser(res.data);
        }).catch(err => console.error(err));

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
