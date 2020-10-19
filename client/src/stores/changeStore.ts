import Axios from 'axios';
import { observable, action } from 'mobx';
import { IChange, IChangeStore } from '../types';

export class changestore {

    @observable changes: IChange[] = [];

    @action fetchChanges() {
        Axios.get('/api/changes').then(res => {

            const parsedChanges = res.data.map((change: any) => {
                return {
                    ...change,
                    properties: JSON.parse(change.properties)
                }
            });

            this.changes = parsedChanges;
                      
        });
    }
}

export const changeStore: IChangeStore = new changestore();