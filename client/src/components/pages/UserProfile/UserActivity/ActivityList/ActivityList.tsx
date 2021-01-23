import React, { useEffect } from 'react'

// Import Styling
import './ActivityList.scss';

// Import MobX Stuff
import { inject, observer } from "mobx-react";

// Import types
import { IChangeStore, Iuser } from '../../../../../types';

// Import Components
import ListItem from '../../../Dashboard/LatestActivity/LatestActivityList/ListItem/ListItem';

// Props Interface
interface PropsI {
    user: Iuser,
    changeStore?: IChangeStore
}

let ActivityList = ({ user, changeStore }: PropsI) => {

    useEffect(() => {
        changeStore!.fetchChanges();
    }, [changeStore])

    const userChanges = changeStore!.changes.filter(change => change.properties.userId === user._id);

    return (
        <ul className="activity-list">
            
            {userChanges.slice(0, 7).map(change => (
                <ListItem change={change} />
            ))}

            <p className="ending-text">There are <b>{userChanges.length - 7}</b> more items in user's activity.</p>
        </ul>
    )
}

// Inject Store
ActivityList = inject('changeStore')(observer(ActivityList));

export default ActivityList
