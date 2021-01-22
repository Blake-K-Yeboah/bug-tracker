import React, { useState } from 'react'

// Import Styling
import './NewComment.scss';

// Import Types
import { IAuthStore, ICommentStore, Iproject } from '../../../../../types';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Axios
import Axios from 'axios';

// Props Interface
interface PropsI {
    project: Iproject | null,
    authStore?: IAuthStore,
    commentStore?: ICommentStore
}

// Request Body Interface
interface IRequestBody {
    text:string,
    userId: string,
    type: string,
    typeId: string
}

let NewComment = ({ project, authStore, commentStore }: PropsI) => {

    const [text, setText] = useState<string>('');

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const createNewComment = () => {

        const requestBody: IRequestBody = {
            text,
            userId: authStore!.user.id,
            type: 'project',
            typeId: project!._id
        }

        Axios.post('/api/comments/create', requestBody).then(res => {
            commentStore!.fetchComments();
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

// Inject Store
NewComment = inject('authStore', 'commentStore')(observer(NewComment));

export default NewComment
