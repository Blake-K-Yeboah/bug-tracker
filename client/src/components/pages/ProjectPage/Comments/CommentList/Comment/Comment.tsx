import React, { useEffect, useState } from 'react'

import './Comment.scss';

import axios from 'axios';

import { inject, observer } from 'mobx-react';

import { FaTimes } from 'react-icons/fa';

let Comment = ({ comment, authStore }: any) => {

    const [user, setUser]: any = useState(null);

    useEffect(() => {

        axios.get(`/api/users/${comment.user}`).then(res => {
            setUser(res.data);
        });

    });

    return (
        <li className="comment">

            {user ? (
                <>
                    <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" />

                    <div className="text-container">
                        <h4 className="name">{user.name}</h4>
                        <p className="text">{comment.text}</p>
                    </div>

                    {authStore.user.id === user._id || authStore.user.role === "admin" ? <FaTimes className="del-icon" /> : ''}

                </>
            ) : ''}
            
        </li>
    )
}

Comment = inject('authStore')(observer(Comment));

export default Comment
