import React from 'react'

import './CommentList.scss';

import Comment from './Comment/Comment';
import { Icomment } from '../../../../../types';

const CommentList = ({ comments }: any) => {
    return (
        <>
            {comments ? (
                <ul className="comment-list">
                    {comments.map((comment: Icomment) => <Comment comment={comment} />)}
                </ul>
            ) : 'Loading'}
        </>
    )
}

export default CommentList
