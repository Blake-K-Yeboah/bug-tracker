import React from 'react'

// Import Mobx Stuff
import { inject, observer } from 'mobx-react';

// Import types
import { IAuthStore } from '../../../../types';

// Import Styling
import './YourProfile.scss';

// Props Interface
interface PropsI {
    authStore?: IAuthStore
}

let YourProfile = ({ authStore }: PropsI) => {

    return (
        <div className="your-profile">
            <h3 className="heading">Your Profile</h3>

            <div className="your-profile-grid">

                <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${authStore ? authStore.user.profileIcon : ''}`} alt="Profile Icon" />

                <div className="content">

                    <h4 className="profile-name">{authStore ? authStore.user.name : ''}</h4>

                    <p className="profile-bio">{authStore && authStore.user.bio === "" ? "No Bio" : authStore && authStore.user.bio > 190 ? `${authStore.user.bio.substr(0, 190)}...` : authStore ? authStore.user.bio : ''}</p>

                </div>

            </div>
            
        </div>
    )
}

// Inject Store
YourProfile = inject('authStore')(observer(YourProfile));

export default YourProfile;
