import React, { useEffect } from 'react'

// Import Styling
import './LatestActivity.scss';

// Import Mobx stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { IStoreProps } from '../../../../types';

import LatestActivityList from './LatestActivityList/LatestActivityList';
import { NavLink } from 'react-router-dom';

let LatestActivity = ({ changeStore }: IStoreProps) => {

    useEffect(() => {
        changeStore.fetchChanges();
    }, [changeStore]);

    return (
        <div className="latest-activity-container">

            <h3 className="heading">Latest Activity</h3>

            <LatestActivityList />

            {
                changeStore.changeCount > 7 ? <NavLink to="/history" className="view-all-link">View All</NavLink> : <span className="disabled-view-all-link">View All</span>
            }

        </div>  
    )
}

LatestActivity = inject("changeStore")(observer(LatestActivity));

export default LatestActivity
