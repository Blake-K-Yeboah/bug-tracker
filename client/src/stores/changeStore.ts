import Axios from 'axios';
import { observable, action } from 'mobx';
import { IChange, IChangeStore } from '../types';

export class changestore {

    @observable changes: IChange[] = [];

    @action fetchChanges() {
        Axios.get('/api/changes').then(res => {

            if (res.data.length > 0) {
                this.changes = res.data;
            }
            
        });
    }
}

export const changeStore: IChangeStore = new changestore();