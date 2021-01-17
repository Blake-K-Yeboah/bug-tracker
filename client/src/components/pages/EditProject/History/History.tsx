import React, { useEffect } from 'react'

// Import Styling
import './History.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import types
import { IChange } from '../../../../types';

let History = ({ project, changeStore }: any) => {

    useEffect(() => {
        changeStore.fetchChanges();
    }, [changeStore]);

    const projectChanges: any = project ? changeStore.changes.filter((change: IChange) => {

        if (change.properties.hasOwnProperty('projectName') && change.properties.projectName === project.name) {
            return true
        } else {
            return false
        }

    }) : [];

    return (
        <div className="history-section">

            <h2 className="title">Project History</h2>

            <p className="sub-text">There were a total of {projectChanges.length} changes to this project.</p>
                
        </div>
    )
}

History = inject('changeStore')(observer(History));

export default History
