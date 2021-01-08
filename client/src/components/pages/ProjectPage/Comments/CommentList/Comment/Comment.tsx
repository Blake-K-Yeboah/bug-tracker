import React, { useEffect, useState } from 'react'

import './Comment.scss';

import axios from 'axios';

import { inject, observer } from 'mobx-react';

import { FaTimes } from 'react-icons/fa';

import { NavLink } from 'react-router-dom';

let Comment = ({ comment, authStore }: any) => {

    const [user, setUser]: any = useState(null);

    useEffect(() => {

        axios.get(`/api/users/${comment.user}`).then(res => {
            setUser(res.data);
        });

    });

    const deleteHandler = () => {

        const body: any = { userId: authStore.user.id };

        axios.delete(`/api/comments/${comment._id}`, body).then(res => {
            alert('Comment Deleted');
            window.location.reload();
        }).catch(err => {
            if (err) alert(err.response.dat.msg);
        });

    };

    return (
        <li className="comment">

            {user ? (
                <>
                    <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`} alt="Profile Icon" />

                    <div className="text-container">
                        <NavLink to={`/profile/${user._id}`} className="name">{user.name}</NavLink>
                        <p className="text">{comment.text}</p>
                    </div>

                    {authStore.user.id === user._id || authStore.user.role === "admin" ? <FaTimes className="del-icon" onClick={deleteHandler} /> : ''}

                </>
            ) : ''}

        </li>
    )
}

Comment = inject('authStore')(observer(Comment));

export default Comment
