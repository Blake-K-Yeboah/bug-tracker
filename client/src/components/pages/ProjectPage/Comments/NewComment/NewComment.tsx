import React, { useState } from 'react'

import './NewComment.scss';

import { IStoreProps } from '../../../../../types';
import { inject, observer } from 'mobx-react';
import Axios from 'axios';

let NewComment = ({ project, authStore, commentStore }: IStoreProps) => {

    const [text, setText] = useState('');

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const createNewComment = () => {

        const requestBody = {
            text,
            userId: authStore.user.id,
            type: 'project',
            typeId: project._id
        }

        Axios.post('/api/comments/create', requestBody).then(res => {
            commentStore.fetchComments();
            setText('')
        }).catch(err => {
            alert(err.response.data.msg);
        });

    };

    return (
        <div className="new-comment">
            
            <h4 className="small-heading">Write a comment</h4>

            <input type="text" className="comment-input" value={text} onChange={inputChangeHandler} placeholder="Comment: " />

            <button className="btn primary" onClick={createNewComment}>Post</button>

        </div>
    )
}

NewComment = inject('authStore', 'commentStore')(observer(NewComment));

export default NewComment
