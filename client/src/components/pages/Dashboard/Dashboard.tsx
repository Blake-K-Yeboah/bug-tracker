import React from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Statistics from './Statistics/Statistics'
import Navbar from '../../layout/Navbar/Navbar';

const Dashboard = () => {

    // TODO - Add Other dashboard sections when all the features are created

    return (
        <>
            <Helmet>

                <title>Bug Tracker - Dashboard</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">Dashboard</h1>

                <Statistics />

            </div>

        </>
    )
}

export default Dashboard
