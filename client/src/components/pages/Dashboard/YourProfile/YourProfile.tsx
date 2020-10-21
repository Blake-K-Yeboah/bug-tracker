import React from 'react'

// Import Mobx Stuff
import { inject, observer } from 'mobx-react';

// Import types
import { IStoreProps } from '../../../../types';

// Import Styling
import './YourProfile.scss';

let YourProfile = ({ authStore }: IStoreProps) => {
    return (
        <div className="your-profile">
            <h3 className="heading">Your Profile</h3>

            <div className="your-profile-grid">

                <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${authStore.user.profileIcon}`} alt="Profile Icon" />

                <div className="content">

                    <h4 className="profile-name">{authStore.user.name}</h4>

                    <p className="profile-bio">{authStore.user.bio === "" ? "No Bio" : authStore.user.bio > 190 ? `${authStore.user.bio.substr(0, 190)}...` : authStore.user.bio}</p>

                </div>
            </div>
        </div>
    )
}

YourProfile = inject('authStore')(observer(YourProfile));

export default YourProfile;
