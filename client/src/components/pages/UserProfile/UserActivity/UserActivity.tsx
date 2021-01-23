import React from 'react';

// Import Styling
import './UserActivity.scss';

// Import types
import { Iuser } from '../../../../types';

// Import Components
import ActivityList from './ActivityList/ActivityList';

// Props Interface
interface PropsI {
    user: Iuser | null
}

const UserActivity = ({ user }: PropsI) => {

    const firstname = user ? user.name.split(' ')[0] : '';

    return (
        <div className="user-activity">

            {user ? <>
            
                <h2 className="title">{firstname}'s Activity</h2>

                <div className="divider"></div>

                <ActivityList user={user} />

            </> : <></>}

        </div>
    )
}

export default UserActivity
