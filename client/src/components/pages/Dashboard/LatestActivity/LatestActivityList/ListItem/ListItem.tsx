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
        let _isMounted = true;

        if (_isMounted) {
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
        }

    }, [change.properties]);

    let returnedJSX: null | JSX.Element = null;

    let checkUser = Object.keys(user).length !== 0;
    let userName = checkUser ? user.name.split(' ')[0] : null;
    
    let checkChangedUser = Object.keys(changedUser).length !== 0;
    let changedUserName = checkChangedUser ? changedUser.name.split(' ')[0] : 'Loading';

    const role = change.properties.newRole;
    
    const roleDisplay = role === 'project-manager' ? 'Project Manager' : 
                        role ? `${role.charAt(0).toUpperCase()}${role.slice(1, role.length)}` : '';

    switch(change.type) {

        case 'ACCOUNT_CREATED':
            returnedJSX = (
                <li className="list-item">
                    
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                     : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> created an account.
                    </p> : ''}
                </li>
            );
            break;
        case 'ROLE_CHANGED':
            returnedJSX = (
                <li className="list-item">
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                        : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ?  <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message} <NavLink to={`/profile/${checkChangedUser ? changedUser._id : ''}`} className="link">{changedUserName}</NavLink> to <b>{roleDisplay}</b>
                    </p> : ''}
                </li>
            );
            break;
        case 'PROJECT_CREATED':
            returnedJSX = (
                <li className="list-item">
                        
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                     : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message}<b>{change.properties.projectName}</b>
                    </p> : ''}
                </li>
            );
            break;
        case 'COMMENT_ADDED':
            returnedJSX = (
                <li className="list-item">
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                     : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message}<b>{change.properties.type}</b>
                    </p> : ''}
                </li>
            )
            break;
        case 'COMMENT_DELETED':
            returnedJSX = (
                <li className="list-item">
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                     : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message}<b>{change.properties.type}</b>
                    </p> : ''}
                </li>
            )
    }

    return returnedJSX;
}

export default ListItem
