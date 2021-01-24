import React, { useEffect } from 'react'

// Import Styling
import './History.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import types
import { IChange } from '../../../../types';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import types
import { Iproject, IChangeStore } from '../../../../types';

// Props Interface
interface PropsI {
    project: Iproject | null,
    changeStore?: IChangeStore
}

let History = ({ project, changeStore }: PropsI) => {

    useEffect(() => {
        changeStore!.fetchChanges();
    }, [changeStore]);

    // Array of Changes to the project
    const projectChanges: IChange[] = project && changeStore ? changeStore.changes.filter((change: IChange) => {

        if (change.properties.hasOwnProperty('projectName') && change.properties.projectName === project.name) {
            return true
        } else {
            return false
        }

    }) : [];

    return (
        <div className="history-section">

            {project ? <>

                <h2 className="title">Project History</h2>
            
                <div className="info-group">

                    <h3 className="heading">Project Changes</h3>

                    <p className="desc">There were a total of {projectChanges.length} changes to this project.</p>

                    <NavLink to="/history"><button className="btn primary">View Project Changes</button></NavLink>

                </div>

                <div className="info-group">

                    <h3 className="heading">Other Changes</h3>

                    <p className="desc">There were a total of {changeStore!.changes.length - projectChanges.length} changes to other entities.</p>

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

// Inject Store
History = inject('changeStore')(observer(History));

export default History
