import React from 'react'

// Import Mobx stuff
import { inject, observer } from 'mobx-react';

// Import types
import { IStoreProps } from '../../../../../types';

// Import Styling
import './LatestActivityList.scss';

// Import ListItem Component
import ListItem from './ListItem/ListItem';

let LatestActivityList = ({ changeStore }: IStoreProps) => {
    return (
        <ul className="latest-activity-list">
            {
                changeStore.changes.map((change: any) => {
                    return (
                     <ListItem change={change} key={change._id}/>
                    )
                })
            }
        </ul>
    )
}

LatestActivityList = inject("changeStore")(observer(LatestActivityList));

export default LatestActivityList;
