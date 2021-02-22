import React from 'react'

// Import Styling
import './DangerZone.scss';

// Import Types
import { IAuthStore, Iticket } from '../../../../types';

// Import Hook
import { useHistory } from 'react-router-dom';

// Import Axios
import Axios from 'axios';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Props Interface 
interface PropsI {
    ticket: Iticket | null,
    authStore?: IAuthStore
}

let DangerZone = ({ ticket, authStore }: PropsI) => {

    // Define History
    let history = useHistory();

    const deleteTicket = () => {

        const body = { userId: authStore!.user.id };

        Axios.delete(`/api/tickets/${ticket!._id}`, { data: body }).then(res => {
            alert('Ticket Deleted');
            history.push('/tickets');
        }).catch(err => {
            alert('An Error Occured');
        });
    }

    return (
        <div className="danger-zone">
            {ticket ? <>
            
                <h2 className="title">Danger Zone</h2>
                
                <div className="delete-group">

                    <h3 className="heading">Delete Ticket</h3>

                    <p className="desc">Delete entire ticket including all comments</p>

                    <button className="btn danger" onClick={deleteTicket} >Delete Ticket</button>

                </div>

            </> : <>
            
                <div className="loader title"></div>

                <div className="loader delete-group-title"></div>
                <div className="loader delete-group-desc"></div>
                <div className="loader delete-group-btn"></div>

            </>}
        </div>
    )
}

// Inject Store
DangerZone = inject('authStore')(observer(DangerZone));

export default DangerZone
