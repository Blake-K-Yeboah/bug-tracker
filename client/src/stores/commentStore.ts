import { observable, action } from 'mobx';
import axios from 'axios';
import { Icomment, ICommentStore } from '../types';

export class commentstore {

    // Store Comments
    @observable comments: Icomment[] = [];

    // Fetch Comments
    @action fetchComments() {
        axios.get('/api/comments').then(res => {
            
            if (res.data.length > 0) {

                this.comments = res.data.map((comment: any) => {
                    return {
                        ...comment,
                        for: JSON.parse(comment.for)
                    }
                }).reverse();

            }

        })
    }

}

export  const commentStore: ICommentStore = new commentstore();