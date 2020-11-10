import Axios from 'axios';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IStoreProps, Iuser } from '../../../../types';
import ErrorAlert from '../../../alerts/ErrorAlert';

// Imported Styling
import './NewProjectContainer.scss';

let NewProjectContainer = ({ usersStore }: IStoreProps) => {

    useEffect(() => {
        usersStore.fetchUsers();
    }, [usersStore]);

    const [userInput, setUserInput] = useState({
        title: '',
        description: '',
        owner: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value});
    }

    const [show, setShow] = useState(true);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        Axios.post('/api/projects/create')
    }

    return (
        <div className="new-project-container">
            
            <h2 className="heading">Create New Project</h2>

            <div className="form-container new-project-form-container">

                <form className="new-project-form form" onSubmit={submitHandler}>

                    {show ? <ErrorAlert message="There was an error." setShow={setShow} /> : ''}

                    <div className="form-group">

                        <label className="input-label" htmlFor="title">Title</label>
                        <input type="text" className="input" placeholder="Title: " id="title" onChange={onChange} value={userInput.title} />

                    </div>

                    <div className="form-group">

                        <label className="input-label" htmlFor="description">Short Description</label>
                        <input type="text" className="input" placeholder="Description: " id="description" onChange={onChange} value={userInput.description} />

                    </div>

                    <div className="form-group">

                        <label className="input-label">Owner</label>
                        <select className="select" onChange={onChange} id="owner" value={userInput.owner}>

                        {usersStore.userCount === 0 ? '' : usersStore.users.map((user: Iuser) => {
                        
                            if (user.role === "project-manager" || user.role === "admin") {
                                return (
                                    <option value={user._id} key={user._id}>{user.name}</option>
                                )
                            } else {
                                return ''
                            }
        
                        })}

                        </select>

                    </div>
                    
                    <div className="form-group">

                        <button type="submit" className="btn primary has-icon">Create <FiPlus className="icon" /></button>

                    </div>

                </form>

            </div>

        </div>
    )
}

NewProjectContainer = inject("usersStore")(observer(NewProjectContainer));

export default NewProjectContainer;
