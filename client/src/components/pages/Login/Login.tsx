import React from 'react';

// Import React Helmet
import { Helmet } from 'react-helmet';

// Import Page Components
import LoginForm from './LoginForm';

const Register = () => {
    return (
        <>
            <Helmet>

                <title>Bug Tracker - Login</title>

            </Helmet>

            <div className="page-container">

                <LoginForm />

            </div>

        </>
    )
}

export default Register
