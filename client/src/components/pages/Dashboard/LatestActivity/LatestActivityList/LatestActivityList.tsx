import React from 'react'

// Import Mobx stuff
import { inject, observer } from 'mobx-react';

// Import types
import { IChangeStore } from '../../../../../types';

// Import Styling
import './LatestActivityList.scss';

// Import ListItem Component
import ListItem from './ListItem/ListItem';

// Props Interface
interface PropsI {
    changeStore?: IChangeStore
}

let LatestActivityList = ({ changeStore }: PropsI) => {
    return (
        <ul className="latest-activity-list">
            {
                changeStore!.changes.slice(0,7).map((change) => {
                    return (
                     <ListItem change={change} key={change._id}/>
                    )
                })
            }
        </ul>
    )
}

// Inject Store
LatestActivityList = inject("changeStore")(observer(LatestActivityList));

export default LatestActivityList;
