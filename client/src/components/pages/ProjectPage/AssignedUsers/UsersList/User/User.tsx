import React, { useEffect, useState } from 'react'

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Styling
import './User.scss';

// Import Axios
import Axios from 'axios';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { IAuthStore, Iproject, Iuser } from '../../../../../../types';

// Props Interface
interface PropsI {
    project: Iproject,
    userId: string,
    authStore?: IAuthStore
}

// Request Body Interface
interface IRequestBody {
    removedUserId: string,
    userId: string
}

let User = ({ userId, project, authStore }: PropsI) => {

    const [user, setUser] = useState<Iuser | null>(null);

    useEffect(() => {

        // Fetch User
        const fetchUser = async () => {
            const res = await Axios.get(`/api/users/${userId}`)
            setUser(res.data);
        }

        fetchUser();
        
    }, [userId]);

    const removeUser = () => {
        
        const body: IRequestBody = {
            removedUserId: user ? user._id : '',
            userId: authStore!.user.id
        }

        Axios.put(`/api/projects/${project._id}/removeuser`, body).then(res => {
            alert('Removed User From Project');
            window.location.reload();
        });
    }

    return (
        <div className="user">
            {user ? <>
            
                <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" />

                <NavLink to={`/profile/${user._id}`} className='user-name'>{user.name}</NavLink>

                {(authStore!.user.role === 'admin' || authStore!.user.role === 'project-manager') && project.owner !== user._id ? <>

                    <button className="btn danger remove-btn" onClick={removeUser}>Remove</button>

                </> : <>

                    <button className="btn disabled remove-btn" disabled>Remove</button>

                </>}

            </> : <>

                <div className="loader user"></div>

            </>}

        </div>
    )
}

// Inject Store
User = inject('authStore')(observer(User));

export default User
