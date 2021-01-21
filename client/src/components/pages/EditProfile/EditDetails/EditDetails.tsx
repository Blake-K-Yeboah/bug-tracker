import React, { useEffect, useState } from 'react'

// Import Styling
import './EditDetails.scss';

// Import Axios
import Axios from 'axios';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import useHistory hook
import { useHistory } from 'react-router-dom';

// Import Types
import { IAuthStore, Iuser } from '../../../../types';

// Props Interface
interface PropsI {
    user: Iuser | null,
    authStore?: IAuthStore
}

// Request Body Interface
interface IRequestBody {
    field: string,
    value: string
}

let EditDetails = ({ user, authStore }: PropsI) => {
    
    // Define History
    let history = useHistory();

    useEffect(() => {

        // Redirect if user isnt the same as logged in user
        if (user && user._id !== authStore!.user.id) {
            history.push(`/profile/${user._id}`);
        }

    });

    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');

    // Update Name Handler
    const updateNameHandler = () => {
        const body: IRequestBody = {
            field: 'name',
            value: name || user!.name
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
        const body: IRequestBody = {
            field: 'bio',
            value: bio || user!.bio
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

            </> : <>
            
                <div className="loader title"></div>

                <div className="loader edit-input-label"></div>
                <div className="loader edit-input"></div>

                <div className="loader edit-input-label"></div>
                <div className="loader edit-input larger"></div>
                
            </>}

        </div>
    )
}

// Inject Store
EditDetails = inject('authStore')(observer(EditDetails));

export default EditDetails
