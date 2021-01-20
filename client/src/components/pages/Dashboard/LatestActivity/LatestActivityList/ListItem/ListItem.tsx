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

            const fetchUsers = async () => {

                const res = await Axios.get(`/api/users/${change.properties.userId}`);
                setUser(res.data);

                if (change.properties.hasOwnProperty("changedUserId")) {
                    const response = await Axios.get(`/api/users/${change.properties.changedUserId}`);
                    setChangedUser(response.data);
                }
            }

            fetchUsers();
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
            break;
        case 'NEW_USER_TO_PROJECT':
                returnedJSX = (
                    <li className="list-item">
                        {!checkUser ? 
                            <div className="profile-icon-loader"></div>
                         : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                        }
                        {userName ? <p className="message">
                            <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message}<NavLink to={`/profile/${checkChangedUser ? changedUser._id : ''}`} className="link">{changedUserName}</NavLink> to project <b>{change.properties.projectName}</b>
                        </p> : ''}
                    </li>
                )
                break;
        case 'REMOVE_USER_FROM_PROJECT':
            returnedJSX = (
                <li className="list-item">
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                     : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message.replace('added', 'removed')}<NavLink to={`/profile/${checkChangedUser ? changedUser._id : ''}`} className="link">{changedUserName}</NavLink> from project <b>{change.properties.projectName}</b>
                    </p> : ''}
                </li>
            )
            break;
        case 'TICKET_CREATED':
            returnedJSX = (
                <li className="list-item">
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                     : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message} <b>{change.properties.ticketText}</b>
                    </p> : ''}
                </li>
            )
            break;    
        case 'TRANSFER_OWNERSHIP_PROJECT':
            returnedJSX = (
                <li className="list-item">
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                     : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message.replace('owner', 'ownership')} <b>{change.properties.projectName}</b> to <NavLink to={`/profile/${checkChangedUser ? changedUser._id : ''}`} className="link">{changedUserName}</NavLink>
                    </p> : ''}
                </li>
            )
            break;
        case 'UPDATED_PROJECT':
            returnedJSX = (
                <li className="list-item">
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                     : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message} <b>{change.properties.projectName}</b>
                    </p> : ''}
                </li>
            )
            break;
        case 'PROJECT_DELETED':
            returnedJSX = (
                <li className="list-item">
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                        : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> deleted a {change.message} <b>{change.properties.projectName}</b>
                    </p> : ''}
                </li>
            )
            break;
        case 'UPDATED_PROFILE':
            returnedJSX = (
                <li className="list-item">
                    {!checkUser ? 
                        <div className="profile-icon-loader"></div>
                     : <img className="profile-icon" src={`${process.env.PUBLIC_URL}/uploads/profile/${checkUser ? user.profileIcon : ''}`} alt="Profile Icon" />
                    }
                    {userName ? <p className="message">
                        <NavLink to={`/profile/${checkUser ? user._id : ''}`} className="link">{userName}</NavLink> {change.message}
                    </p> : ''}
                </li>
            )
            break;
    }

    return returnedJSX;
}

export default ListItem
