import axios from 'axios';
import { observable, action, computed } from 'mobx';
import { IChange, IChangeStore } from '../types';

export class changestore {

    @observable changes: any = [];

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

    @observable changesSort: string = 'newest';

    @action changeSort(newSort: string) {
        this.changesSort = newSort;

        switch(this.changesSort) {

            case 'newest':
                this.changes.replace(this.changes.slice().sort((a: IChange, b: IChange) => {
                    let dateA = new Date(a.date).getTime();
                    let dateB = new Date(b.date).getTime();
                    return dateA > dateB ? -1 : 1;  
                }));
                break;

            case 'oldest': 
                this.changes.replace(this.changes.slice().sort((a: IChange, b: IChange) => {
                    let dateA = new Date(a.date).getTime();
                    let dateB = new Date(b.date).getTime();
                    return dateA > dateB ? 1 : -1;  
                }));
                break;

        }
    }
}

export const changeStore: IChangeStore = new changestore();