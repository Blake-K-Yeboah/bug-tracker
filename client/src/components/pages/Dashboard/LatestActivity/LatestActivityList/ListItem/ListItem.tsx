import Axios from 'axios';
import React, { useEffect, useState } from 'react'

const ListItem = ({change}: any) => {
    
    const [user, setUser]: any = useState({});

    useEffect(() => {
        Axios.get(`/api/users/${change.properties.userId}`).then(res => {
            setUser(res.data);
        }).catch(err => {
            alert(err.msg);
        });
    }, [change.properties.userId]);

    let returnedJSX: null | JSX.Element = null;

    let checkUser = Object.keys(user).length !== 0;

    switch(change.type) {

        case 'ACCOUNT_CREATED':
            returnedJSX = (
                <li className="list-item">
                    <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    <p className="message">
                        <span className="user-name">{checkUser ? user.name.split(' ')[0] : 'Loading'}</span> created an account.
                    </p>
                </li>
            )
    }

    return returnedJSX;
}

export default ListItem
