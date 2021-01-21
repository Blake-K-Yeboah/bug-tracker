import React, { useEffect } from 'react'

// Import Styling
import './LatestActivity.scss';

// Import Mobx stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { IChangeStore } from '../../../../types';

// Import Page Components
import LatestActivityList from './LatestActivityList/LatestActivityList';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Props Interface
interface PropsI {
    changeStore?: IChangeStore
}

let LatestActivity = ({ changeStore }: PropsI) => {

    useEffect(() => {
        changeStore!.fetchChanges();
    }, [changeStore]);

    return (
        <div className="latest-activity-container">

            <h3 className="heading">Latest Activity</h3>

            <LatestActivityList />

            {
                changeStore && changeStore.changeCount > 7 ? <NavLink to="/history" className="view-all-link">View All</NavLink> : <span className="disabled-view-all-link">View All</span>
            }

        </div>  
    )
}

// Inject Store
LatestActivity = inject("changeStore")(observer(LatestActivity));

export default LatestActivity
