import { observable, action } from 'mobx';

// Import JWT decode to decode jwt token
import jwt_decode from 'jwt-decode';

import { Iuser, IAuthStore } from '../types';

export class authstore {

    // Store JWT Token
    @observable token: string | null = document.cookie.split('=')[1];

    // Store authenticated boolean
    @observable isAuthenticated = this.token ? true : false;

    // Store Logged in User
    @observable user = this.token ? jwt_decode(this.token) : null;

    // Store Error
    @observable error: boolean = false;

    // Action to change error
    @action
    setError(err: boolean) {
        this.error = err;
    }

    // Action to set current user
    @action
    setCurrentUser(user: Iuser | null) {
        this.user = user;
        if (user === null) this.isAuthenticated = false;
    }

    // Action to set token
    @action
    setToken(token: string | null) {
        this.token = token;
        this.isAuthenticated = token ? true : false;
    }

}

export const authStore: IAuthStore = new authstore();
