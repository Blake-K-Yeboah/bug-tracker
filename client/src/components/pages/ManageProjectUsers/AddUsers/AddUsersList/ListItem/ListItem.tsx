import React, { useEffect, useState } from 'react'

// Import Styling
import './ListItem.scss';

// Import Axios
import Axios from 'axios';

// Import NavLink
import { NavLink } from 'react-router-dom';

const ListItem = ({ userId }: any) => {

    const [user, setUser]: any = useState('');

    useEffect(() => {
        Axios.get(`/api/users/${userId}`).then(res => {
            setUser(res.data);
        });
    }, [userId]);

    return (
        <>
            {user ? <>
                <li className="list-item">
                    
                        
                        <NavLink to={`/profile/${user._id}`} className="content">

                            <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" />                
                            
                            <p className="name">{user.name}</p>

                        </NavLink>

                        <button className="btn primary">Add</button>
                    
                </li>
            </> : ''}
        </>
    )
}

export default ListItem
