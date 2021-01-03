import React from 'react'

// Import Styling
import './ProfileInfo.scss';

// Import Image
import profileHeader from './profile-header.jpg';

// Import Icons
import { FaEnvelope, FaUser, FaCalendar, FaPen } from 'react-icons/fa';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

let ProfileInfo: any = ({ user, authStore }: any) => {

    const role: string = user && user.role === 'project-manager' ? 'Project Manager' : user ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1,user.role.length)}` : '';

    const date: null | Date = user ? new Date(user.createdOn) : null;

    const displayDate = date ? `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` : '';

    const loggedInUserId = authStore.user.id;

    const editProfileBtn = <button className="btn has-icon light">Edit Profile <FaPen className="icon" /></button>

    return (

        <div className="profile-info">

            { user ? <>
            
                    <img src={profileHeader} alt="Header" className="header-img" />

                    <img src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" className="profile-img" />

                    <h3 className="user-name">{user.name}</h3>

                    <p className="user-bio">{user.bio || 'No Bio'}</p>

                    <div className="user-icon-group">

                        <FaEnvelope className="icon" />

                        <span className="text">{user.email}</span>

                    </div>

                    <div className="user-icon-group">

                        <FaUser className="icon" />

                        <span className="text">{role as string}</span>

                    </div>

                    <div className="user-icon-group">

                        <FaCalendar className="icon" />

                        <span className="text">{displayDate as string}</span>

                    </div>

                    {loggedInUserId === user._id ? editProfileBtn : ''}

                </> :

                <>

                    <div className="loader header"></div>

                    <div className="loader profile-pic"></div>

                    <div className="loader text"></div>

                    <div className="loader text"></div>

                    <div className="loader text"></div>

                </>
            
            }

        </div>

    )
}

ProfileInfo = inject("authStore")(observer(ProfileInfo));

export default ProfileInfo
