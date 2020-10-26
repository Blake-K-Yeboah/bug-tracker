import React, { useState } from 'react'

// Import Styling
import './Navbar.scss';

import { BsGrid3X3Gap } from 'react-icons/bs';

import Dropdown from './Dropdown/Dropdown';
import Search from './Search/Search';

const Navbar = () => {

    const [show, setShow] = useState(false);

    return (
        <nav className="navbar">

            <h1 className="navbar-brand">Bug Tracker</h1>

            <div className="right-side-content">

                <Search />
                
                <BsGrid3X3Gap className="menu-icon" onClick={() => setShow(!show)} />

                <Dropdown display={show} />

            </div>

        </nav>
    )

}

export default Navbar
