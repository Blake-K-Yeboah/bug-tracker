import React, { useState } from 'react'

// Import Styling
import './Navbar.scss';

// Import Icons
import { BsGrid3X3Gap } from 'react-icons/bs';
import { AiOutlineBug } from 'react-icons/ai'

// Import Components
import Dropdown from './Dropdown/Dropdown';
import Search from './Search/Search';

// Import Axios
import Axios from 'axios';

const Navbar = () => {

    // Apply authorization token to every request if logged in
    Axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');

    // Define show state
    const [show, setShow] = useState<boolean>(false);

    return (
        <nav className="navbar">

            <h1 className="navbar-brand"> <AiOutlineBug className="icon" /> Bug Tracker</h1>

            <div className="right-side-content">

                <Search />
                
                <BsGrid3X3Gap className="menu-icon" onClick={() => setShow(!show)} />

                <Dropdown display={show} setShow={setShow} />

            </div>

        </nav>
    )

}

export default Navbar;
