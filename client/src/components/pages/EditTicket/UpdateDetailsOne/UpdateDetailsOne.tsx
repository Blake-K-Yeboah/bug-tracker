import React, { useState, useEffect } from 'react'

// Import Styling
import './UpdateDetailsOne.scss';

// Import axios
import Axios from 'axios';

// Import Types
import { IAuthStore, Iticket, IUsersStore } from '../../../../types';

// MobX Stuff
import { inject, observer } from 'mobx-react';

// Props Interface
interface PropsI {
    ticket: Iticket | null,
    authStore?: IAuthStore,
    usersStore?: IUsersStore
}

let UpdateDetailsOne = ({ ticket, authStore, usersStore}: PropsI) => {

    // Store Text and Developer values for user input
    const [text, setText] = useState<string>('');
    const [dev, setDev] = useState<string>('');
    
    useEffect(() => {

        // Fetch Users
        usersStore!.fetchUsers();

        if (ticket) { 
            setText(ticket.text);
            setDev(ticket.dev);
        }

    }, [ticket, usersStore]);

    // Update Text Handler
    const updateTextHandler = () => {
        const body = {
            userId: authStore!.user.id,
            field: 'text',
            value: text || ticket!.text
        }

        Axios.put(`/api/tickets/${ticket ? ticket._id : ''}`, body).then(res => {
            alert("Ticket Updated");
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert("An error occured");
        })
    }

    // Update Developer Handler
    const updateDevHandler = () => {
        const body = {
            userId: authStore!.user.id,
            field: 'dev',
            value: dev || ticket!.dev
        }

        Axios.put(`/api/tickets/${ticket ? ticket._id : ''}`, body).then(res => {
            alert("Ticket Updated");
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert("An error occured");
        })
    }

    return (
        <div className="update-details-one">

            {ticket ? <>
            
                <h2 className="title">Update Text and Developer</h2>

                <div className="input-container">

                    <label htmlFor="text" className="label">Text</label>

                    <div className="input-group">

                        <input type="text" placeholder="Text:" id="text" defaultValue={ticket.text} onChange={e => setText(e.target.value)} />

                        <button className="btn primary input-group-btn" onClick={updateTextHandler}>Update</button>

                    </div>

                </div>

                <div className="input-container">

                    <label htmlFor="dev" className="label">Developer</label>

                    <div className="input-group">

                        <select id="dev" value={dev} onChange={e => setDev(e.target.value)}>

                            {usersStore!.users ? usersStore!.users.map(user => {

                                if (user.role === 'developer') {

                                    return <option key={user._id} value={user._id}>{user.name}</option>

                                } else {

                                    return ''

                                }

                            }) : ''}

                        </select>

                        <button className="btn primary input-group-btn" onClick={updateDevHandler}>Update</button>

                    </div>

                </div>
            
            </> : <>
            
                <div className="loader title"></div>

                <div className="loader input-label"></div>
                <div className="loader input"></div>

                <div className="loader input-label"></div>
                <div className="loader input"></div>

            </>}

        </div>
    )
}

// Inject Store
UpdateDetailsOne = inject('authStore', 'usersStore')(observer(UpdateDetailsOne));

export default UpdateDetailsOne
