import React from 'react'
import Spinner from '../../../Spinner/Spinner';

// Import Styling
import './InfoSection.scss';

const InfoSection = ({ user }: any) => {
    return (
        <>

        {user !== null ? 

            <div className="info-section">

                <h3 className="heading">User Information</h3>

                <div className="info-grid">

                    <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" />

                    <div className="content">

                        <h4 className="profile-name">{user.name}</h4>

                        <p className="profile-bio">{user.bio === "" ? "No Bio" : user.bio > 190 ? `${user.bio.substr(0, 190)}...` : user.bio}</p>

                    </div>

                </div>

            </div>

        : <Spinner /> }

        </>
    )
}

export default InfoSection
