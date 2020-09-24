import { observable, action } from 'mobx';
import { Iuser } from '../types';
import axios from 'axios';

export class usersStore {

    // Store users 
    @observable users: Iuser[] | null = null;

}