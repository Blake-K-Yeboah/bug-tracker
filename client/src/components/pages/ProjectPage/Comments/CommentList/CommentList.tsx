import React from 'react'

import './CommentList.scss';

import Comment from './Comment/Comment';
import { Icomment } from '../../../../../types';

const CommentList = ({ comments }: any) => {
    return (
        <>
            {comments ? (
                <ul className={`comment-list ${comments.length > 3 ? 'more-than-three' : ''}`}>
                    { comments.length > 0 ? comments.map((comment: Icomment) => <Comment comment={comment} key={comment._id} />) : <li>No Comments</li>}
                </ul>
            ) : ''}
        </>
    )
}

export default CommentList
