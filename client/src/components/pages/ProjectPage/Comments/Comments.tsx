import React, { useEffect } from 'react'

// Import Styling
import './Comments.scss';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { IStoreProps } from '../../../../types';

let Comments = ({ project, commentStore }: IStoreProps) => {

    useEffect(() => {
        commentStore.fetchComments();
    }, [commentStore]);

    return (
        <div className="comment-section">

            <h2 className="title">Comments</h2>

        </div>
    )
}

Comments = inject('commentStore')(observer(Comments));

export default Comments
