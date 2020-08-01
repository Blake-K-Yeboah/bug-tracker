import React from 'react';
import { Helmet } from 'react-helmet';
import SignUpForm from './SignUpForm';

const Home = () => {
    return (
        <>

            <Helmet>

                <title>Bug Tracker - Home</title>

            </Helmet>

            <div className="form-container">

                <SignUpForm />

                <img src="/img/night-city-bg.jpg" className="bg-img" alt="Background" />

            </div>


        </>
    )
}

export default Home