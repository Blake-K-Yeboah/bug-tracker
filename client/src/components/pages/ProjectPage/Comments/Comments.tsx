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

            {activeComments ? <>
            
                <h2 className="title">Comments ({activeComments.length})</h2>
            
                <CommentList comments={activeComments} />
            
            </> : <>
            
                <div className="loader title"></div>
                <div className="loader comment"></div>
                <div className="loader comment"></div>
                <div className="loader comment"></div>
            
            </>}
            

        </div>
    )
}

Comments = inject('commentStore')(observer(Comments));

export default Comments
