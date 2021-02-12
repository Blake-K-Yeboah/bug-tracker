import React, { useEffect, useState } from 'react'

// Import Styling
import './NewTicketContainer.scss';

// Import Icons
import { FiPlus } from 'react-icons/fi';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Alerts
import ErrorAlert from '../../../alerts/ErrorAlert';
import SuccessAlert from '../../../alerts/SuccessAlert';

// Import Types
import { IAuthStore, IProjectStore, IUsersStore } from '../../../../types';
import Axios from 'axios';

// Props Interface
interface PropsI {
    authStore?: IAuthStore,
    usersStore?: IUsersStore,
    projectStore?: IProjectStore
}

// User Input Interface
interface IUserInput {
    owner: string,
    text: string,
    status: string,
    dev: string,
    priority: number,
    projectId: string
}

let NewTicketContainer = ({ authStore, usersStore, projectStore }: PropsI) => {

    useEffect(() => {
        usersStore!.fetchUsers();
        projectStore!.fetchProjects();
    }, [usersStore, projectStore]);

    const [userInput, setUserInput] = useState<IUserInput>({
        owner: authStore!.user.id,
        text: '',
        status: 'not-started',
        dev: usersStore!.users.length > 0 ? usersStore!.users.filter(user => user.role === "developer")[0]._id : '',
        priority: 1,
        projectId: ''
    });

    
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value});
    }

    const [errorShow, setErrorShow] = useState<boolean>(false);
    const [successShow, setSuccessShow] = useState<boolean>(false);

    // TODO Create Submit Handler
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = { 
            ...userInput,
            projectId: userInput.projectId === '' ? projectStore!.projects[0]._id : userInput.projectId,
            dev: userInput.dev === '' ? usersStore!.users.filter(user => user.role === "developer")[0]._id : userInput.dev
        };

        Axios.post('/api/tickets/create', body).then(res => {
            setErrorShow(false);
            setSuccessShow(true);
            setUserInput({
                ...userInput,
                text: '',
                status: '',
                dev: '',
                priority: 1,
                projectId: ''
            });
        }).catch(error => {
            setSuccessShow(false);
            setErrorShow(true);
            console.log(error.response)
        });
    }
    
    return (
        <div className="new-ticket-container">
            
            <NavLink className="back-to-tickets" to="/tickets">&lt; Back To Tickets</NavLink>

            <h2 className="heading">Create New Ticket</h2>

            <div className="form-container new-ticket-form-container">

                <form className="new-ticket-form form" onSubmit={submitHandler}>
                    
                    {errorShow ? <ErrorAlert message="An error occured. Try again later" setShow={setErrorShow} /> : ''}
                    {successShow ? <SuccessAlert message="Successfully created!" setShow={setSuccessShow} /> : ''}

                    <div className="form-group">

                        <label className="input-label" htmlFor="text">Text</label>
                        <input type="text" className="input" placeholder="Text: " id="text" onChange={onChange} value={userInput.text} />

                    </div>

                    <div className="form-group">

                        <label className="input-label" htmlFor="status">Status</label>
                        <select className="select" onChange={onChange} id="status" value={userInput.status}>
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                    </div>

                    <div className="form-group">

                        <label className="input-label" htmlFor="priority">Priority</label>
                        <select className="select" onChange={onChange} id="priority" value={userInput.priority}>
                            <option value={1}>Not Important</option>
                            <option value={2}>Semi Important</option>
                            <option value={3}>Important</option>
                        </select>

                    </div>

                    <div className="form-group">

                        <label className="input-label" htmlFor="dev">Developer</label>
                        <select className="select" onChange={onChange} id="dev" value={userInput.dev}>
                            
                            {usersStore!.users ? usersStore!.users.map(user => {

                                if (user.role === "developer") {

                                    return <option value={user._id} key={user._id}>{user.name}</option>

                                } else {

                                    return '';

                                }

                            }) : ''}
                            
                        </select>

                    </div>

                    <div className="form-group">

                        <label className="input-label" htmlFor="projectId">Project</label>
                        <select className="select" onChange={onChange} id="projectId" value={userInput.projectId}>
                            
                            {projectStore!.projects ? projectStore!.projects.map(project => (
                                    <option value={project._id} key={project._id}>{project.name}</option>
                            )) : ''}
                            
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

// Inject Stores
NewTicketContainer = inject("authStore", "usersStore", "projectStore")(observer(NewTicketContainer));

export default NewTicketContainer
