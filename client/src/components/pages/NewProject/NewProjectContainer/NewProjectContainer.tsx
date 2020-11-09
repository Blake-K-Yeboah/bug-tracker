import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IStoreProps, Iuser } from '../../../../types';

// Imported Styling
import './NewProjectContainer.scss';

let NewProjectContainer = ({ usersStore }: IStoreProps) => {

    useEffect(() => {
        usersStore.fetchUsers();
    }, [usersStore]);

    const [userInput, setUserInput] = useState({
        title: '',
        description: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value});
    }

    return (
        <div className="new-project-container">
            
            <h2 className="heading">Create New Project</h2>

            <p className="sub-text">Fill out the following form to create a new project</p>
            
            <div className="form-container new-project-form-container">

                <form className="new-project-form form">

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
                        <select className="select">

                        {usersStore.userCount === 0 ? '' : usersStore.users.map((user: Iuser) => {
                        
                            if (user.role === "project-manager" || user.role === "admin") {
                                return (
                                    <option value={user.name} key={user._id}>{user.name}</option>
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
