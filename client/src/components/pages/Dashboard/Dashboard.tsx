import React from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Statistics from './Statistics/Statistics'
import Navbar from '../../layout/Navbar/Navbar';

// Import Styling
import './Dashboard.scss';
import LatestActivity from './LatestActivity/LatestActivity';

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

                <div className="dashboard-grid">

                    <LatestActivity />
                    
                    <div className="grid-item-container">

                        <div className="placeholder"></div>
                        
                        <div className="placeholder"></div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Dashboard
