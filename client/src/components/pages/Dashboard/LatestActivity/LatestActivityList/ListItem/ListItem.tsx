import React, { useEffect, useState } from 'react'

// Import Styling
import './ListItem.scss';

// Import Axios
import Axios from 'axios';

// Import Nav Link
import { NavLink } from 'react-router-dom';

// Imports Types
import { IChange, Iuser } from '../../../../../../types';

// Props Interface
interface PropsI {
    change: IChange
}

const ListItem = ({ change }: PropsI) => {
    
    const [user, setUser]: any = useState<Iuser | {}>({});
    const [changedUser, setChangedUser]: any = useState<Iuser | {}>({});

    useEffect(() => {
        let _isMounted = true;

        if (_isMounted) {

            // Fetch Users
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

    let checkUser: boolean = Object.keys(user).length !== 0;
    let userName: null | string  = checkUser ? user.name.split(' ')[0] : null;
    
    let checkChangedUser: boolean = Object.keys(changedUser).length !== 0;
    let changedUserName: null | string = checkChangedUser ? changedUser.name.split(' ')[0] : null;

    const role: string | undefined = change.properties.newRole;
    
    const roleDisplay: string = role === 'project-manager' ? 'Project Manager' : 
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
        case 'DELETED_TICKET':
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
        // For Debugging
        default:
            returnedJSX = (
                <li className="list-item">
                    <p>{change.type}</p>
                </li>
            )
    }

    return returnedJSX as JSX.Element;
}

export default ListItem
