import React from 'react'

// Import Styling
import './DangerZone.scss';

// Import Types
import { Iticket } from '../../../../types';

// Import Hook
import { useHistory } from 'react-router-dom';

// Import Axios
import Axios from 'axios';

// Props Interface 
interface PropsI {
    ticket: Iticket | null
}

const DangerZone = ({ ticket }: PropsI) => {

    // Define History
    let history = useHistory();

    const deleteTicket = () => {
        Axios.delete(`/api/tickets/${ticket!._id}`).then(res => {
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

                    <button className="btn danger" onClick={deleteTicket} >Delete Project</button>

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

export default DangerZone
