import React from 'react'

// Import Helmet to Change Page Titlte
import { Helmet } from 'react-helmet';
import { FaHome } from 'react-icons/fa';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Page Components
import Navbar from '../../layout/Navbar/Navbar';

// Import Styling
import './NotFound.scss';

const NotFound = () => {

    const route = window.location.pathname;

    return (
        <>
            <Helmet>
                
                <title>Bug Tracker - 404</title>

            </Helmet>
            
            <div className="page-content">

                <Navbar />

                <section className="not-found-section">

                    <h1 className="title">
                        Page Not Found
                    </h1>

                    <p className="text">
                        The route '{route}' is not associated with any pages. Please ensure there are no typos. Click the button below to be redirected to the home page.
                    </p>

                    <NavLink to="/">

                        <button className="btn primary has-icon">
                            Go Home
                            <FaHome className="icon" />
                        </button>

                    </NavLink>

                </section>

            </div>
        </>
    )
}

export default NotFound
