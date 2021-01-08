import React from 'react'

import './CommentList.scss';

import Comment from './Comment/Comment';
import { Icomment } from '../../../../../types';

const CommentList = ({ comments }: any) => {
    return (
        <>
            {comments ? (
                <ul className={`comment-list ${comments.length > 3 ? 'more-than-three' : ''}`}>
                    {comments.map((comment: Icomment) => <Comment comment={comment} key={comment._id} />)}
                </ul>
            ) : 'Loading'}
        </>
    )
}

export default CommentList
