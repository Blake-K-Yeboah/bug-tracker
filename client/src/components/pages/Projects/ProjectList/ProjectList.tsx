import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react'
import { IStoreProps } from '../../../../types';

import './ProjectList.scss';

import ProjectItem from './ProjectItem/ProjectItem';
import Spinner from '../../../Spinner/Spinner';

let ProjectList = ({ projectStore }: IStoreProps) => {

    useEffect(() => {
        projectStore.fetchProjects();
    }, []);

    return (
        <div className="project-list-container">
            
            <h2 className="heading">Table of Projects ({projectStore.projectCount} project{projectStore.projectCount === 1 ? '' : 's'})</h2>
            
            {projectStore.projectCount === 0 ? <Spinner /> : 'Project Table'}

        </div>
    )
}

ProjectList = inject("projectStore")(observer(ProjectList));

export default ProjectList;
