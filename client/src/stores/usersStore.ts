import { observable, action, computed } from 'mobx';
import { Iuser, IUsersStore } from '../types';
import axios from 'axios';

export class usersstore {

    // Store users 
    @observable users: Iuser[] = [];

    @action async fetchUsers() {

        try {

            const res = await axios.get('/api/users');
            this.users = res.data;

        } catch (err) {

            console.log(err);
            
        }
    }

    @computed get userCount() {
        return this.users.length
    }

}

export const usersStore: IUsersStore = new usersstore();