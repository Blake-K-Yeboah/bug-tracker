import React from 'react'
import Axios from 'axios'
import { inject, observer } from 'mobx-react'

// Import Styling
import './DangerZone.scss'
import { NavLink, useHistory } from 'react-router-dom'

let DangerZone = ({ project, authStore }: any) => {

    let history = useHistory();

    // TODO Delete Project Handler
    const deleteProject = () => {
        Axios.delete(`/api/projects/${project._id}`).then(res => {
            alert('Project Deleted');
            history.push('/projects');
        }).catch(err => {
            alert('An Error Occured');
        });
    }


    return (

        <div className="danger-zone">
            
            {project ? <>
                
                <h2 className="title">Danger Zone</h2>

                <div className="delete-group">

                    <h3 className="heading">Delete Project</h3>

                    <p className="desc">Delete entire project including all comments and tickets</p>

                    <button className="btn danger" onClick={deleteProject} >Delete Project</button>

                </div>

                <div className="delete-group">

                    <h3 className="heading">Transfer Ownership</h3>

                    <p className="desc">Change owner of project; you cannot revert this</p>

                    {project.owner === authStore.user.id ? <NavLink to={`/project/${project._id}/transfer-owner`}><button className="btn danger">Transfer Ownership</button></NavLink> : <button className="btn" disabled>Transfer Ownership</button>}
                    
                </div>

            </> : <>
            
                <div className="loader title"></div>

                <div className="loader delete-group-title"></div>
                <div className="loader delete-group-desc"></div>
                <div className="loader delete-group-btn"></div>

                <div className="loader delete-group-title second-one"></div>
                <div className="loader delete-group-desc"></div>
                <div className="loader delete-group-btn"></div>

            </>}

        </div>
    )
}

DangerZone = inject('authStore')(observer(DangerZone));

export default DangerZone
