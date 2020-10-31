import { observable, action, computed } from 'mobx';
import { Iproject, IProjectStore, } from '../types';
import axios from 'axios';

export class projectstore {

    // Store users 
    @observable projects: Iproject[] = [];

    @action fetchProjects() {
        axios.get('/api/projects').then(res => {

            if (res.data.length > 0) {
                this.projects = res.data;
            }

        });
    }

    @computed get projectCount() {
        return this.projects.length
    }

}

export const projectStore: IProjectStore = new projectstore();