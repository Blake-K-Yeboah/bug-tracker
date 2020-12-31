import React from 'react'

// Import Styling
import './ProfileInfo.scss';

// Import Image
import profileHeader from './profile-header.jpg';

const ProfileInfo: any = ({ user }: any) => {

    return (
        <div className="profile-info">
            
            <img src={profileHeader} alt="Header Image" className="header-img" />

            

        </div>
    )
}

export default ProfileInfo
