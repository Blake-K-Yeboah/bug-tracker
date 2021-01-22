import React, { useState, useEffect } from 'react'

// Import Styling
import './TransferOwnerContainer.scss';

// Import Axios
import Axios from 'axios';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Types
import { Iproject, Iuser, IUsersStore } from '../../../../types';

// Import useHistory Hook
import { useHistory } from 'react-router-dom';

// Props Interface
interface PropsI {
    project: Iproject | null,
    usersStore?: IUsersStore
}

// Request Body Interface
interface IRequestBody {
    userId: string,
    newUserId: string
}

let TransferOwnerContainer = ({ project, usersStore }: PropsI) => {

    const [newOwner, setNewOwner]: any = useState<string>('');
    const [projectOwner, setProjectOwner]: any = useState<Iuser | null>(null);

    useEffect(() => {
        usersStore!.fetchUsers();

        if (project) {
            Axios.get(`/api/users/${project.owner}`).then(res => {
                setProjectOwner(res.data);
            });
        }
    }, [project, usersStore]);

    let history = useHistory();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body: IRequestBody = {
            userId: projectOwner._id,
            newUserId: newOwner
        }

        Axios.put(`/api/projects/${project!._id}/transferowner`, body).then(res => {
            alert('Successfully Transfered Ownership');
            history.push('/projects');
        }).catch(err => {
            console.error(err);
            alert('An error occured')
        })

    }

    return (

        <div className="transfer-owner-container">
            
            <h2 className="heading">Transfer Ownership of Project</h2>

            <div className="form-container">

                <form className="form" onSubmit={submitHandler}>

                    <div className="form-group">

                        <label className="input-label" htmlFor="project">Project</label>
                        <select className="select" id="project" disabled>
                            <option>{project ? project.name : 'Loading'}</option>
                        </select>

                    </div>

                    <div className="form-group">

                        <label className="input-label" htmlFor="currentOwner">Current Owner</label>
                        <select className="select" id="currentOwner" disabled>
                            <option>{projectOwner ? projectOwner.name : 'Loading'}</option>
                        </select>

                    </div>

                    <div className="form-group">

                        <label className="input-label" htmlFor="newOwner">New Owner</label>
                        <select className="select" id="newOwner" value={newOwner} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewOwner(e.target.value)}>

                            {usersStore!.users.filter((user) => user.role === 'admin' || user.role === 'project-manager').map((user) => (
                                
                                <option value={user._id} key={user._id}>{user.name}</option>

                            ))}

                        </select>

                    </div>
                    
                    <div className="form-group">

                        <button type="submit" className="btn primary">Transfer Ownership</button>

                    </div>

                </form>

            </div>

        </div>
    )
}

// Inject Store
TransferOwnerContainer = inject('usersStore')(observer(TransferOwnerContainer));

export default TransferOwnerContainer
