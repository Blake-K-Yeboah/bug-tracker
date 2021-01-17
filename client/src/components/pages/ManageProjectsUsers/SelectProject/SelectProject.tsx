import React, { useEffect, useState } from 'react'

// Import Styling
import './SelectProject.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { Iproject } from '../../../../types';

// Import useHistory Hook
import { useHistory } from 'react-router-dom';

let SelectProject = ({ projectStore }: any) => {

    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        projectStore.fetchProjects()
    }, [projectStore]);

    let history = useHistory();

    const clickHandler = () => {

        const route = `/manage-projects-users/${projectId}`;

        history.push(route);
        
    }

    return (
        <div className="select-project">

            <h2 className="heading">Select A Project</h2>

            <div className="form-container">

                <form className="form">

                    <div className="form-group">

                        <label className="input-label" htmlFor="project">Project</label>

                        <select className="select" id="project" value={projectId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProjectId(e.target.value)}>

                            {projectStore.projects.map((project: Iproject) => (
                                <option value={project._id} key={project._id}>{project.name}</option>
                            ))}

                        </select>

                    </div>
                    
                    <div className="form-group">

                        <button type="submit" className="btn primary" onClick={clickHandler}>Manage Users</button>

                    </div>

                </form>
            
            </div>

        </div>
    )
}

SelectProject = inject('projectStore')(observer(SelectProject));

export default SelectProject
