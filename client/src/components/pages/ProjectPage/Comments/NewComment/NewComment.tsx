import React, { useState } from 'react'

import './NewComment.scss';

const NewComment = () => {

    const [text, setText] = useState('');

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    return (
        <div className="new-comment">
            
            <h4 className="small-heading">Write a comment</h4>

            <input type="text" className="comment-input" value={text} onChange={inputChangeHandler} placeholder="Comment: " />

            <button className="btn primary">Post</button>

        </div>
    )
}

export default NewComment
