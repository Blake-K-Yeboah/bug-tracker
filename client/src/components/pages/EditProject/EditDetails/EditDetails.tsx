import React, { useState, useEffect } from 'react';

// Import Axios
import Axios from 'axios';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Styling
import './EditDetails.scss'

let EditDetails = ({ project, authStore }: any) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {

        if (project) { 
            setName(project.name);
            setDescription(project.description);
        }

    }, [project]);

    // Update Name Handler
    const updateNameHandler = () => {
        const body = {
            userId: authStore.user.id,
            field: 'name',
            value: name
        }

        Axios.put(`/api/projects/${project ? project._id : ''}`, body).then(res => {
            alert("Project Updated");
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert("An error occured");
        })
    }

    // TODO Update Description Handler
    const updateDescHandler = () => {
        const body = {
            userId: authStore.user.id,
            field: 'description',
            value: description
        }

        Axios.put(`/api/projects/${project ? project._id : ''}`, body).then(res => {
            alert("Project Updated");
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert("An error occured");
        })
    }

    return (

        <div className="edit-details">
            {project ? <>

                <h2 className="title">Edit '{project.name}' Details</h2>

                <div className="edit-input-container">

                    <label htmlFor="name" className="label">Name:</label>

                    <div className="input-group">

                        <input type="text" placeholder="Name:" id="name" defaultValue={project.name} onChange={e => setName(e.target.value)} />

                        <button className="btn primary input-group-btn" onClick={updateNameHandler}>Update</button>

                    </div>

                </div>

                <div className="edit-input-container">

                    <label htmlFor="description" className="label">Description:</label>

                    <div className="input-group">

                        <input type="text" placeholder="Description:" id="description" defaultValue={project.description} onChange={e => setDescription(e.target.value)} />

                        <button className="btn primary input-group-btn" onClick={updateDescHandler}>Update</button>

                    </div>
                    
                </div>
            
            </> : <>
            
                <div className="loader title"></div>

                <div className="loader edit-input-label"></div>
                <div className="loader edit-input"></div>

                <div className="loader edit-input-label"></div>
                <div className="loader edit-input"></div>

            </>}

        </div>

    )

}

EditDetails = inject('authStore')(observer(EditDetails));

export default EditDetails
