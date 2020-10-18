import { observable, action, computed } from 'mobx';
import { Iuser, IUsersStore } from '../types';
import axios from 'axios';

export class usersstore {

    // Store users 
    @observable users: Iuser[] = [];

    @action fetchUsers() {
        axios.get('/api/users').then(res => {

            if (res.data.length > 0) {
                this.users = res.data;
            }

        });
    }

    @computed get userCount() {
        return this.users.length
    }

}

export const usersStore: IUsersStore = new usersstore();