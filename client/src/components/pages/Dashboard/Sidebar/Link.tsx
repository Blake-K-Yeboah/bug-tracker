import React from 'react'
import { NavLink } from 'react-router-dom';

const Link = (props: any) => {

    const { route, text } = props;

    const linkClass = `link ${window.location.pathname === route ? 'active' : ''}`;

    return (
        <li className="links-list-item">

            <NavLink to={route} className={linkClass}>

                {props.children}

                <span className="text">{text as string}</span>

            </NavLink>

        </li>
    )
}

export default Link
