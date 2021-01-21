import React from 'react'

// Import types
import { Iuser } from '../../../../types';

// Import Stylesheet
import './UploadProfilePic.scss';

// Props Interface
interface PropsI {
    user: Iuser | null
}

const UploadProfilePic = ({ user }: PropsI) => {

    return (
        <div className="upload-profile-pic">
            <h2 className="title">Upload Profile Picture</h2>
        </div>
    )

}

export default UploadProfilePic
