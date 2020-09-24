import React from 'react'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';

// Import useHistory hook
import { useHistory } from 'react-router-dom';

// Import Icon
import { BsArrowCounterclockwise } from 'react-icons/bs';

const NotAllowed = () => {

    let history = useHistory();

    const btnClickHandler = () => {
        history.goBack();
    }

    return (
        <div className="page-content">

            <Navbar />

            <Sidebar />

            <h1 className="page-title">You dont have permission to access this page</h1>

            <button className="btn primary has-icon" onClick={btnClickHandler}>Go Back <BsArrowCounterclockwise className="icon" /></button>

        </div>
    )
}

export default NotAllowed
