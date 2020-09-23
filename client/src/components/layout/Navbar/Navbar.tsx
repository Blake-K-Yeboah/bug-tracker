import React, { useState } from 'react'

// Import Styling
import './Navbar.scss';

import { BsGrid3X3Gap } from 'react-icons/bs';

import Dropdown from './Dropdown/Dropdown';

const Navbar = () => {

    const [show, setShow] = useState(false);

    return (
        <nav className="navbar">

            <h1 className="navbar-brand">Bug Tracker</h1>

            <BsGrid3X3Gap className="menu-icon" onClick={() => setShow(!show)} />

            <Dropdown display={show} />

        </nav>
    )

}

export default Navbar
