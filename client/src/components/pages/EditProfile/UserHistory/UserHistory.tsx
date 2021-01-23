import React, { useEffect } from 'react'

// Import Styling
import './UserHistory.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import types
import { IChangeStore, Iuser } from '../../../../types';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Props Interface
interface PropsI {
    changeStore?: IChangeStore,
    user: Iuser | null
}

let UserHistory = ({ changeStore, user }: PropsI) => {

    useEffect(() => {
        changeStore!.fetchChanges();
    }, [changeStore]);

    // Array of Changes to the user
    const userChanges = user && changeStore ? changeStore.changes.filter(change => {

        if (change.properties.userId === user._id) {
            return true
        } else {
            return false
        }

    }) : [];

    return (
        <div className="user-history">
            
            {user ? <>

                <h2 className="title">User History</h2>
            
                <div className="info-group">

                    <h3 className="heading">User Changes</h3>

                    <p className="desc">There were a total of {userChanges.length} changes to this user.</p>

                    <NavLink to="/history"><button className="btn primary">View Project Changes</button></NavLink>

                </div>

                <div className="info-group">

                    <h3 className="heading">Other Changes</h3>

                    <p className="desc">There were a total of {changeStore!.changes.length - userChanges.length} changes to other entities.</p>

                    <NavLink to="/history"><button className="btn primary">View Other Changes</button></NavLink>

                </div>

            </> : <>
            
                <div className="loader title"></div>

                <div className="loader info-group-title"></div>
                <div className="loader info-group-desc"></div>
                <div className="loader info-group-btn"></div>

                <div className="loader info-group-title second-one"></div>
                <div className="loader info-group-desc"></div>
                <div className="loader info-group-btn"></div>
            
            </>}

        </div>
    )
}

UserHistory = inject('changeStore')(observer(UserHistory));

export default UserHistory
