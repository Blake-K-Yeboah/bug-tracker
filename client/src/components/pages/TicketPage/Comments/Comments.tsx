import React, { useEffect } from 'react'

// Import Styling
import './Comments.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { Icomment, ICommentStore, Iticket } from '../../../../types';

// Import Components
import CommentList from '../../ProjectPage/Comments/CommentList/CommentList';
import NewComment from './NewComment/NewComment';

// Props Interface
interface PropsI {
    ticket: Iticket | null,
    commentStore?: ICommentStore
}

let Comments = ({ ticket, commentStore }: PropsI) => {

    useEffect(() => {
        commentStore!.fetchComments();
    }, [commentStore]);

    const activeComments: Icomment[] | null = commentStore!.comments && ticket ? 
        commentStore!.comments.filter((comment: Icomment) => comment.for.type === 'ticket' && comment.for.typeId === ticket._id)
    : null;

    return (
        <div className="comment-section">

            {activeComments ? <>
            
                <h2 className="title">Comments ({activeComments.length})</h2>
            
                <CommentList comments={activeComments} />

                <NewComment ticket={ticket} />
            
            </> : <>
            
                <div className="loader title"></div>
                <div className="loader comment"></div>
                <div className="loader comment"></div>
                <div className="loader comment"></div>
                <div className="loader write-a-comment"></div>
            
            </>}
            

        </div>
    )
}

Comments = inject('commentStore')(observer(Comments));

export default Comments
