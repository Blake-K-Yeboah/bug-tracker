import { observable, action } from 'mobx';
import { Iuser } from '../types';
import axios from 'axios';

export class usersstore {

    // Store users 
    @observable users: Iuser[] | null = null;

    @action fetchUsers() {
        axios.get('/api/users').then(res => {

            if (res.data.length > 0) {
                this.users = res.data;
            }

        });
    }

}

export const usersStore = new usersstore();