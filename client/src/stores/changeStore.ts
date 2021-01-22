import axios from 'axios';
import { observable, action, computed } from 'mobx';
import { IChange, IChangeStore } from '../types';

export class changestore {

    @observable changes: IChange[] = [];

    @action async fetchChanges() {

        try {

            const res = await axios.get('/api/changes');
            this.changes = res.data.map((change: any) => {
                return {
                    ...change,
                    properties: JSON.parse(change.properties)
                }
            });

        } catch (err) {

            console.log(err);
            
        }

    }

    @computed get changeCount() {
        return this.changes.length;
    }
}

export const changeStore: IChangeStore = new changestore();