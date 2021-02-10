import React, { useEffect, useState } from 'react'

// Import Styling
import './Comment.scss';

// Import Axios
import axios from 'axios';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Icon
import { FaTimes } from 'react-icons/fa';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Types
import { Icomment, IAuthStore, ICommentStore, Iuser } from '../../../../../../types';

// Props Interface
interface PropsI {
    comment: Icomment,
    authStore?: IAuthStore,
    commentStore?: ICommentStore
}

let Comment = ({ comment, authStore, commentStore }: PropsI) => {

    const [user, setUser] = useState<Iuser | null>(null);

    useEffect(() => {

        // Fetch Comment user
        const fetchUser = async () => {
            const res = await axios.get(`/api/users/${comment.user}`);
            setUser(res.data);
        }

        fetchUser()

    }, [comment]);

    const deleteHandler = () => {

        const body: any = { userId: authStore!.user.id };

        axios.delete(`/api/comments/${comment._id}`, body).then(res => {
            commentStore!.fetchComments();
            alert('Comment Deleted');
        }).catch(err => {
            if (err) alert(err.response.data.msg);
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

                    {authStore!.user.id === user._id || authStore!.user.role === "admin" ? <FaTimes className="del-icon" onClick={deleteHandler} /> : ''}

                </>
            ) : ''}

        </li>
    )
}

// Inject Store
Comment = inject('authStore', 'commentStore')(observer(Comment));

export default Comment
