import React, { useEffect, useState } from 'react'

// Import Styling
import './EditDetails.scss';

// Import Axios
import Axios from 'axios';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import useHistory hook
import { useHistory } from 'react-router-dom';

let EditDetails = ({ user, authStore }: any) => {
    
    let history = useHistory();

    useEffect(() => {

        // Redirect if user isnt the same as logged in user
        if (user && user._id !== authStore.user.id) {
            history.push(`/profile/${user._id}`);
        }

    });

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    // Update Name Handler
    const updateNameHandler = () => {
        const body = {
            field: 'name',
            value: name || user.name
        }

        Axios.put(`/api/users/${user ? user._id : ''}`, body).then(res => {
            alert("Profile Updated. You may need to log out and in again for changes to take effect.");
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert("An error occured");
        })
    }

    // Update Bio Handler
    const updateBioHandler = () => {
        const body = {
            field: 'bio',
            value: bio || user.bio
        }

        Axios.put(`/api/users/${user ? user._id : ''}`, body).then(res => {
            alert("Profile Updated. You may need to log out and in again for changes to take effect.");
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert("An error occured");
        })
    }

    return (
        <div className="edit-details">
            
            {user ? <>
            
                <h2 className="title">Edit Details</h2>

                <div className="edit-input-container">

                    <label htmlFor="name" className="label">Name</label>

                    <div className="input-group">

                        <input type="text" placeholder="Name:" id="name" defaultValue={user.name} onChange={e => setName(e.target.value)} />

                        <button className="btn primary input-group-btn" onClick={updateNameHandler}>Update</button>

                    </div>

                </div>

                <div className="edit-input-container large">

                    <label htmlFor="bio" className="label">Bio</label>

                    <div className="input-group">

                        <input type="text" placeholder="Bio:" id="bio" defaultValue={user.bio} onChange={e => setBio(e.target.value)} />

                        <button className="btn primary input-group-btn" onClick={updateBioHandler}>Update</button>

                    </div>
                    
                </div>

            </> : <></>}

        </div>
    )
}

EditDetails = inject('authStore')(observer(EditDetails));

export default EditDetails
