import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { Iproject, IStoreProps } from '../../../../types';

import './ProjectList.scss';

import Spinner from '../../../Spinner/Spinner';
import TableRow from './TableRow';

let ProjectList = ({ projectStore }: IStoreProps) => {

    useEffect(() => {
        projectStore.fetchProjects();
    }, [projectStore]);

    return (
        <div className="project-list-container">
            
            <h2 className="heading">Table of Projects ({projectStore.projectCount} project{projectStore.projectCount === 1 ? '' : 's'})</h2>
            
            {projectStore.projectCount === 0 ? <Spinner /> 
            :  <table className="projects-table">
                    <thead>
                        <tr className="head-row">
                            <th className="t-head">
                                Name
                            </th>
                            <th className="t-head">
                                Description
                            </th>
                            <th className="t-head">
                                Owner
                            </th>
                            <th className="t-head">
                                Project Link
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectStore.projects.map((project: Iproject) => {
                            return <TableRow project={project} key={project._id} />
                        })}
                    </tbody>
                </table>}

        </div>
    )
}

ProjectList = inject("projectStore")(observer(ProjectList));

export default ProjectList;
