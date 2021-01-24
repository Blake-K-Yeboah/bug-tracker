import React from 'react'

// Import Helmet to access document head
import { Helmet } from 'react-helmet'

// Import Page Components
import Sidebar from '../../layout/Sidebar/Sidebar'
import Navbar from '../../layout/Navbar/Navbar';
import HistoryActionsBar from './HistoryActionsBar/HistoryActionsBar';
import ChangeTable from './ChangeTable/ChangeTable';

// Import Type
import { RouteComponentProps } from 'react-router-dom';

const History: React.FC<RouteComponentProps> = () => {
    
    return (
        <>
            <Helmet>

                <title>Bug Tracker - History</title>

            </Helmet>

            <div className="page-content">

                <Navbar />

                <Sidebar />

                <h1 className="page-title">History</h1>

                <HistoryActionsBar />

                <ChangeTable />

            </div>

        </>
    )
}

export default History
