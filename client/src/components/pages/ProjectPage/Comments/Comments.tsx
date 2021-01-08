import React, { useEffect } from 'react'

// Import Styling
import './Comments.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { Icomment, IStoreProps } from '../../../../types';

// Import Components
import CommentList from './CommentList/CommentList';

let Comments = ({ project, commentStore }: IStoreProps) => {

    useEffect(() => {
        commentStore.fetchComments();
    }, [commentStore]);

    const activeComments: Icomment[] | null = commentStore.comments && project ? 
        commentStore.comments.filter((comment: Icomment) => comment.for.type === 'project' && comment.for.typeId === project._id)
    : null;

    return (
        <div className="comment-section">

            <h2 className="title">Comments ({activeComments ? activeComments.length : 0})</h2>
            
            <CommentList comments={activeComments} />

        </div>
    )
}

Comments = inject('commentStore')(observer(Comments));

export default Comments
