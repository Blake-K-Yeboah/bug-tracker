import React, { useEffect, useState } from 'react'

// Import Styling
import './ListItem.scss';

// Import Axios
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

const ListItem = ({ userId }: any) => {

    const [user, setUser]: any = useState('');

    useEffect(() => {
        Axios.get(`/api/users/${userId}`).then(res => {
            setUser(res.data);
        });
    }, [userId]);

    return (
        <li className="list-item">
            {user ? <>
                
                <NavLink to={`/profile/${user._id}`} className="content">

                    <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" />                
                    
                    <p className="name">{user.name}</p>

                </NavLink>

                <button className="btn danger">Remove</button>
            </> : ''}
        </li>
    )
}

export default ListItem
