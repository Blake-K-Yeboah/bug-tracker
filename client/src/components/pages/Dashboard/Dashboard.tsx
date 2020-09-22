import React from 'react'
import { Helmet } from 'react-helmet'
import Sidebar from './Sidebar/Sidebar'

const Dashboard = () => {
    return (
        <>
            <Helmet>

                <title>Bug Tracker - Dashboard</title>

            </Helmet>

            <div className="page-content">

                <Sidebar />

                <h1>Dashboard Page</h1>

            </div>

        </>
    )
}

export default Dashboard
