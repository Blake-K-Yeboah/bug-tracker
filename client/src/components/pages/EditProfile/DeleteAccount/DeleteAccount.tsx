import React from 'react'

// Import Styling
import './DeleteAccount.scss';

// Import Types
import { IAuthStore, Iuser } from '../../../../types';

// Import Axios
import Axios from 'axios';

// Import useHistory Hook
import { useHistory } from 'react-router-dom';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Props Interface
interface PropsI {
    user: Iuser | null,
    authStore?: IAuthStore
}

let DeleteAccount = ({ user, authStore }: PropsI) => {

    let history = useHistory();

    const deletehandler = () => {

        Axios.delete(`/api/users/${user!._id}`).then(res => {

            localStorage.removeItem('jwtToken');
    
            delete Axios.defaults.headers.common["Authorization"];
    
            authStore!.setCurrentUser(null);
    
            history.push('/login');

        }).catch(err => {

            alert("An error occured.");

        })
    }

    return (
        <div className="delete-account">

            {user ? <>

                <h2 className="title">Delete Account</h2>

                <div className="delete-account-content">

                    <h4 className="heading">Permanently Delete Account</h4>

                    <p className="desc">Permanently delete your account. There is no reverting this.</p>

                    <button className="btn danger" onClick={deletehandler}>Delete Account</button>

                </div>

            </> : <>

                <div className="loader title"></div>
                <div className="loader heading"></div>
                <div className="loader desc"></div>
                <div className="loader button"></div>

            </>}

        </div>
    )
}

// Inject Store
DeleteAccount = inject("authStore")(observer(DeleteAccount));

export default DeleteAccount
