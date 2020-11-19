import { observable, action, computed } from 'mobx';
import { Iproject, IProjectStore, } from '../types';
import axios from 'axios';

export class projectstore {

    // Store projects
    @observable projects: Iproject[] = [];
    
    @observable projectSort: string = "a-z";

    @action setProjectSort(newSort: string) {
        this.projectSort = newSort;

        switch(this.projectSort) {
            case "a-z":
                this.projects = this.projects.slice().sort((a: Iproject, b: Iproject) => {
                    if ( a.name < b.name ){
                        return -1;
                      }
                      if ( a.name > b.name ){
                        return 1;
                      }
                      return 0;
                });
                break;

            case "z-a":
                this.projects = this.projects.slice().sort((a: Iproject, b: Iproject) => {
                    if ( a.name < b.name ){
                        return 1;
                      }
                      if ( a.name > b.name ){
                        return -1;
                      }
                      return 0;
                });
                break;

            case "newest-first":
                this.projects = this.projects.slice().sort((a: Iproject, b: Iproject) => {
                    const dateA = new Date(a.createdOn).getTime();
                    const dateB = new Date(b.createdOn).getTime();
                    return dateA > dateB ? -1 : 1; 
                });
                break;

            case "oldest-first":
                this.projects = this.projects.slice().sort((a: Iproject, b: Iproject) => {
                    const dateA = new Date(a.createdOn).getTime();
                    const dateB = new Date(b.createdOn).getTime();
                    return dateA < dateB ? -1 : 1; 
                });
                break;
        }

    }

    @action fetchProjects() {
        axios.get('/api/projects').then(res => {

            if (res.data.length > 0) {

                // Sorted Alphabetically by default.
                this.projects = res.data.sort((a: Iproject, b: Iproject) => {
                    if ( a.name < b.name ){
                        return -1;
                      }
                      if ( a.name > b.name ){
                        return 1;
                      }
                      return 0;
                });
            }

        });
    }

    @computed get projectCount() {
        return this.projects.length;
    }

}

export const projectStore: IProjectStore = new projectstore();