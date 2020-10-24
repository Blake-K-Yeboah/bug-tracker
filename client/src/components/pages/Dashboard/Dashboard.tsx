import React from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Statistics from './Statistics/Statistics'
import Navbar from '../../layout/Navbar/Navbar';
import LatestActivity from './LatestActivity/LatestActivity';
import YourProfile from './YourProfile/YourProfile';
import TipSection from './TipSection/TipSection';

// Import Styling
import './Dashboard.scss';

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

                        <YourProfile />
                        
                        <TipSection />

                    </div>

                </div>

            </div>

        </>
    )
}

export default Dashboard
