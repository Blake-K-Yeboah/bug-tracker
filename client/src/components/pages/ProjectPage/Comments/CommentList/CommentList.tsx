import React from 'react'

// Import Styling
import './CommentList.scss';

// Import Component
import Comment from './Comment/Comment';

// Import Types
import { Icomment } from '../../../../../types';

// Props Interface
interface PropsI {
    comments: Icomment[] | null
}

const CommentList = ({ comments }: PropsI) => {
    return (
        <>
            {comments ? (
                <ul className={`comment-list ${comments.length > 3 ? 'more-than-three' : ''}`}>
                    { comments.length > 0 ? comments.map((comment) => <Comment comment={comment} key={comment._id} />) : <li>No Comments</li>}
                </ul>
            ) : ''}
        </>
    )
}

export default CommentList
