import React from 'react'

// Import Styling
import './ProfileInfo.scss';

// Import Image
import profileHeader from './profile-header.jpg';

// Import Icons
import { FaEnvelope, FaUser } from 'react-icons/fa';

const ProfileInfo: any = ({ user }: any) => {

    const role = user && user.role === 'project-manager' ? 'Project Manager' : 
                 user ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1,user.role.length)}` : 
                 '';

    return (

        <div className="profile-info">
            
            <img src={profileHeader} alt="Header" className="header-img" />

            { user ? <>
                    <img src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" className="profile-img" />

                    <h3 className="user-name">{user.name}</h3>

                    <p className="user-bio">{user.bio}</p>

                    <div className="user-icon-group">

                        <FaEnvelope className="icon" />

                        <span className="text">{user.email}</span>

                    </div>

                    <div className="user-icon-group">

                        <FaUser className="icon" />

                        <span className="text">{role}</span>

                    </div>

                </> :

                ''
            
            }

        </div>

    )
}

export default ProfileInfo
