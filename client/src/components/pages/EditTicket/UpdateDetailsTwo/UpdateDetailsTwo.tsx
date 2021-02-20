import React, { useEffect, useState } from 'react'

// Import Styling
import './UpdateDetailsTwo.scss';

// Import Types
import { Iticket, IAuthStore } from '../../../../types';

// Import Mobx Stuff
import { inject, observer } from 'mobx-react';

// Import Axios
import Axios from 'axios';

// Props Interface
interface PropsI {
    ticket: Iticket | null,
    authStore?: IAuthStore
}

let UpdateDetailsTwo = ({ ticket, authStore }: PropsI) => {

    // Store Status and Priority values for user input
    const [status, setStatus] = useState<string>('');
    const [priority, setPriority] = useState<number>(0);

    useEffect(() => {
        
        if (ticket) { 
            setStatus(ticket.status);
            setPriority(ticket.priority);
        }

    }, [ticket]);

    // Update Status Handler
    const updateStatusHandler = () => {
        const body = {
            userId: authStore!.user.id,
            field: 'status',
            value: status || ticket!.status
        }

        Axios.put(`/api/tickets/${ticket ? ticket._id : ''}`, body).then(res => {
            alert("Ticket Updated");
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert("An error occured");
        });
    }

    // Update Priority Handler
    const updatePriorityHandler = () => {
        const body = {
            userId: authStore!.user.id,
            field: 'priority',
            value: priority || ticket!.priority
        }

        Axios.put(`/api/tickets/${ticket ? ticket._id : ''}`, body).then(res => {
            alert("Ticket Updated");
            window.location.reload();
        }).catch(err => {
            console.error(err);
            alert("An error occured");
        });
    }

    return (
        <div className="update-details-two">

            {ticket ? <>
            
                <h2 className="title">Update Status and Priority</h2>

                <div className="input-container">

                    <label htmlFor="status" className="label">Status</label>

                    <div className="input-group">

                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>

                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>

                        </select>

                        <button className="btn primary input-group-btn" onClick={updateStatusHandler}>Update</button>

                    </div>

                </div>

                <div className="input-container">

                    <label htmlFor="priority" className="label">Priority</label>

                    <div className="input-group">

                        <select id="priority" value={priority} onChange={(e) => setPriority(parseInt(e.target.value))}>

                            <option value={1}>Not Important</option>
                            <option value={2}>Semi Important</option>
                            <option value={3}>Important</option>

                        </select>

                        <button className="btn primary input-group-btn" onClick={updatePriorityHandler}>Update</button>

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

UpdateDetailsTwo = inject('authStore')(observer(UpdateDetailsTwo));

export default UpdateDetailsTwo
