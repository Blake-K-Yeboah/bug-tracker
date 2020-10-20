import React, { useEffect, useState } from 'react'

// Import Styling
import './ListItem.scss';

// Import Axios
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

const ListItem = ({change}: any) => {
    
    const [user, setUser]: any = useState({});
    const [changedUser, setChangedUser]: any = useState({});
    
    useEffect(() => {
        Axios.get(`/api/users/${change.properties.userId}`).then(res => {
            setUser(res.data);
        }).catch(err => {
            alert(err.msg);
        });
        if (change.properties.hasOwnProperty("changedUserId")) {
            Axios.get(`/api/users/${change.properties.changedUserId}`).then(res => {
                setChangedUser(res.data);
            }).catch(err => {
                alert(err.msg);
            });
        }

    }, [change.properties]);

    let returnedJSX: null | JSX.Element = null;

    let checkUser = Object.keys(user).length !== 0;
    let userName = checkUser ? user.name.split(' ')[0] : 'Loading';
    
    let checkChangedUser = Object.keys(changedUser).length !== 0;
    let changedUserName = checkChangedUser ? changedUser.name.split(' ')[0] : 'Loading';

    const role = change.properties.newRole;
    const roleDisplay = role === "developer" ||  role === "submitter" ? `${role[0].toUpperCase()}${role.substr(1, role.length)}` : '';

    switch(change.type) {

        case 'ACCOUNT_CREATED':
            returnedJSX = (
                <li className="list-item">
                    <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> created an account.
                    </p>
                </li>
            );
            break;
        case 'ROLE_CHANGED':
            returnedJSX = (
                <li className="list-item">
                    <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message} <NavLink to={`/profile/${checkChangedUser ? changedUser._id : ''}`} className="link">{changedUserName}</NavLink> to <b>{roleDisplay}</b>
                    </p>
                </li>
            );
            break;
    }

    return returnedJSX;
}

export default ListItem
