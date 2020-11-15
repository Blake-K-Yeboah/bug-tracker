import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { Iproject, IStoreProps } from '../../../../types';

import './ProjectList.scss';

import Spinner from '../../../Spinner/Spinner';
import TableRow from './TableRow';

let ProjectList = ({ projectStore, authStore }: IStoreProps) => {

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
                                Project Links
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectStore.projects.filter((project: Iproject) => { 
                            if (project.usersList.includes(authStore.user.id) || project.owner === authStore.user.id) {
                                return true
                            } else {
                                return false
                            }
                            
                        }).map((project: Iproject) => {
                            return <TableRow project={project} key={project._id} />
                        })}
                    </tbody>
                </table>}
            
            {projectStore.projectCount > 9 ? <div className="blocker"></div> : ''}

        </div>
    )
}

ProjectList = inject("projectStore", "authStore")(observer(ProjectList));

export default ProjectList;
