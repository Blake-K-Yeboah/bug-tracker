import Axios from 'axios';
import { observable, action, computed } from 'mobx';
import { IChange, IChangeStore } from '../types';

export class changestore {

    @observable changes: IChange[] = [];

    @action fetchChanges() {
        Axios.get('/api/changes').then(res => {

            this.changes = res.data.map((change: any) => {
                return {
                    ...change,
                    properties: JSON.parse(change.properties)
                }
            });

                      
        });
    }

    @computed get changeCount() {
        return this.changes.length;
    }
}

export const changeStore: IChangeStore = new changestore();