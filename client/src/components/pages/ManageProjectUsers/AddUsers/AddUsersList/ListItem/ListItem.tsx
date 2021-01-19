import React, { useEffect, useState } from 'react'

// Import Styling
import './ListItem.scss';

// Import Axios
import Axios from 'axios';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

let ListItem = ({ userId, authStore, projectId }: any) => {

    const [user, setUser]: any = useState('');

    useEffect(() => {
        Axios.get(`/api/users/${userId}`).then(res => {
            setUser(res.data);
        });
    }, [userId]);

    const addUserHandler = () => {
        const body = {
            userId: authStore.user.id,
            addedUserId: user._id
        }

        Axios.put(`/api/projects/${projectId}/adduser`, body).then(res => {
            window.location.reload();
        }).catch(err => {
            alert("An error Occured")
        })
    }

    return (
        <>
            {user ? <>
                <li className="list-item">
                    
                        
                        <NavLink to={`/profile/${user._id}`} className="content">

                            <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" />                
                            
                            <p className="name">{user.name}</p>

                        </NavLink>

                        <button className="btn primary" onClick={addUserHandler}>Add</button>
                    
                </li>
            </> : ''}
        </>
    )
}

ListItem = inject('authStore')(observer(ListItem));

export default ListItem
