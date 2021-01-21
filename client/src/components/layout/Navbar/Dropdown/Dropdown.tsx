import React from 'react';

// Import Styling
import './Dropdown.scss';

// Import MobX stuff
import { inject, observer } from 'mobx-react';

// Import NavLink + useHistory hook
import { NavLink, useHistory } from 'react-router-dom';

// Import Axios
import Axios from 'axios';

// Import Icons
import { FiLogOut } from 'react-icons/fi';

// Import Types
import { IAuthStore } from '../../../../types';

// Props Interface 
interface PropsI {
    display: boolean,
    authStore?: IAuthStore,
    setShow: (show: boolean) => void
}

let Dropdown = ({ display, authStore, setShow }: PropsI) => {

    // Define History
    let history = useHistory();

    // Handle Log Out Button Click
    const logOutHandler = () => {

        localStorage.removeItem('jwtToken');

        delete Axios.defaults.headers.common["Authorization"];

        authStore!.setCurrentUser(null);

        history.push('/login');
    }

    return (
        <>
            <div className={`dropdown ${!display ? 'hidden' : ''}`}>

                <div className="heading-container">

                    {authStore && authStore.user ? <img src={`${process.env.PUBLIC_URL}/uploads/profile/${authStore!.user.profileIcon}`} alt="Profile Icon" className="heading-img" /> : ''}

                    <h3 className="heading-text">{authStore!.user ? authStore!.user.name : 'Loading'}</h3>

                </div>

                <NavLink to={`/profile/${authStore!.user.id}`} className="link" >View Profile</NavLink>

                <NavLink to={`/profile/${authStore!.user.id}/edit`} className="link" >Edit Profile</NavLink>

                <button className="btn danger has-icon" onClick={logOutHandler}>Log Out <FiLogOut className="icon" /></button>

            </div>
            <div className={`dropdown-overlay ${!display ? 'hidden' : ''}`} onClick={() => setShow(false)}></div>
        </>
    )
}

// Inject store into componenet
Dropdown = inject("authStore")(observer(Dropdown));

export default Dropdown
