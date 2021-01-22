import React, { useEffect } from 'react'

// Import Types
import { IAuthStore, Iproject, IProjectStore } from '../../../../types';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Styling
import './ProjectList.scss';

// Import Components
import TableRow from './TableRow';

// Props Interface
interface PropsI {
    authStore?: IAuthStore,
    projectStore?: IProjectStore
}

let ProjectList = ({ projectStore, authStore }: PropsI) => {

    useEffect(() => {
        projectStore!.fetchProjects();
    }, [projectStore]);

    const filteredProjects = projectStore!.projects.filter((project: Iproject) => { 

        if (project.usersList.includes(authStore!.user.id) || project.owner === authStore!.user.id) {
            return true
        } else {
            return false
        }
        
    });

    const projectCount = filteredProjects.length;

    return (
        <div className="project-list-container">
            
            <h2 className="heading">Table of Projects ({projectCount} project{projectCount === 1 ? '' : 's'})</h2>
            
            {projectCount === 0 ? <p style={{marginLeft: '1.75em'}}>No Projects</p>
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
                        {filteredProjects.map((project) => {
                            return <TableRow project={project} key={project._id} />
                        })}
                    </tbody>
                </table>}
            
            {projectStore!.projectCount > 9 ? <div className="blocker"></div> : ''}

        </div>
    )
}

// Inject Store
ProjectList = inject("projectStore", "authStore")(observer(ProjectList));

export default ProjectList;
