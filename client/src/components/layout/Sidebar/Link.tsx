import React from 'react'

// Import NavLink
import { NavLink } from 'react-router-dom';

// Props Interface
interface PropsI {
    route: string,
    text: string,
    children: JSX.Element
}

const Link = ({ route, text, children }: PropsI) => {

    const linkClass = `link ${window.location.pathname === route ? 'active' : ''}`;

    return (
        <li className="links-list-item">

            <NavLink to={route} className={linkClass}>

                {children}

                <span className="text">{text as string}</span>

            </NavLink>

        </li>
    )
}

export default Link
