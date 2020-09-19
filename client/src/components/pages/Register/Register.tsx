import React from 'react';

// Import React Helmet
import { Helmet } from 'react-helmet';

// Import Page Components
import SignUpForm from './SignUpForm';

const Register = () => {
    return (
        <>
            <Helmet>

                <title>Bug Tracker - Register</title>

            </Helmet>

            <div className="page-container">

                <SignUpForm />

            </div>

        </>
    )
}

export default Register
