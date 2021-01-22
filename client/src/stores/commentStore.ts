import { observable, action } from 'mobx';
import axios from 'axios';
import { Icomment, ICommentStore } from '../types';

export class commentstore {

    // Store Comments
    @observable comments: Icomment[] = [];

    // Fetch Comments
    @action async fetchComments() {

        try {

            const res = await axios.get('/api/comments');

            this.comments = res.data.map((comment: any) => {
                return {
                    ...comment,
                    for: JSON.parse(comment.for)
                }
            });

        } catch (err) {

            console.log(err);
            
        }
        
    }

}

export  const commentStore: ICommentStore = new commentstore();