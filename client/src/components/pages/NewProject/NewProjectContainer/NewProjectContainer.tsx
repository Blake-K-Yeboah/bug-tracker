import React, { useEffect, useState } from 'react';

// Import Axios
import Axios from 'axios';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import Icons
import { FiPlus } from 'react-icons/fi';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Types
import { Iuser, IUsersStore } from '../../../../types';

// Import Alerts
import ErrorAlert from '../../../alerts/ErrorAlert';
import SuccessAlert from '../../../alerts/SuccessAlert';

// Imported Styling
import './NewProjectContainer.scss';

// Props Interface
interface PropsI {
    usersStore?: IUsersStore
}

// User Input interface
interface IUserInput {
    name: string,
    description: string,
    owner: string
}

let NewProjectContainer = ({ usersStore }: PropsI) => {

    useEffect(() => {
        usersStore!.fetchUsers();
    }, [usersStore]);

    const [userInput, setUserInput] = useState<IUserInput>({
        name: '',
        description: '',
        owner: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value});
    }

    const [errorShow, setErrorShow] = useState<boolean>(false);
    const [successShow, setSuccessShow] = useState<boolean>(false);
    
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body: IUserInput = {
            ...userInput,
            owner: userInput.owner === '' ? usersStore!.users.filter((user: Iuser) => user.role === 'project-manager'|| user.role === 'admin')[0]._id : userInput.owner
        }

        Axios.post('/api/projects/create', body).then(res => {
            setErrorShow(false);
            setSuccessShow(true);
            setUserInput({
                name: '',
                description: '',
                owner: ''
            });
        }).catch(error => {
            setSuccessShow(false);
            setErrorShow(true);
        });
    }

    return (
        <div className="new-project-container">
            
            <NavLink className="back-to-projects" to="/projects/">&lt; Back To Projects</NavLink>

            <h2 className="heading">Create New Project</h2>

            <div className="form-container new-project-form-container">

                <form className="new-project-form form" onSubmit={submitHandler}>

                    {errorShow ? <ErrorAlert message="An error occured. Try again later" setShow={setErrorShow} /> : ''}
                    {successShow ? <SuccessAlert message="Successfully created!" setShow={setSuccessShow} /> : ''}

                    <div className="form-group">

                        <label className="input-label" htmlFor="name">Name</label>
                        <input type="text" className="input" placeholder="Name: " id="name" onChange={onChange} value={userInput.name} />

                    </div>

                    <div className="form-group">

                        <label className="input-label" htmlFor="description">Short Description</label>
                        <input type="text" className="input" placeholder="Description: " id="description" onChange={onChange} value={userInput.description} />

                    </div>

                    <div className="form-group">

                        <label className="input-label">Owner</label>
                        <select className="select" onChange={onChange} id="owner" value={userInput.owner}>

                        {usersStore!.userCount === 0 ? '' : usersStore!.users.map((user) => {

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

// Inject Store
NewProjectContainer = inject("usersStore")(observer(NewProjectContainer));

export default NewProjectContainer;
