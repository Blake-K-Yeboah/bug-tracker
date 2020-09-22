import React from 'react';
import './Statistics.scss';

// Import Icons
import { FaUsers, FaTags, FaHistory, FaFolderOpen } from 'react-icons/fa';
import StatBox from './StatBox';

const Statistics = () => {


    // TODO - Update values from database when feature is added
    const stats: any = [
        {
            title: 'Projects',
            icon: FaFolderOpen,
            value: 12
        },
        {
            title: 'Users',
            icon: FaUsers,
            value: 20
        },
        {
            title: 'Tickets',
            icon: FaTags,
            value: 65
        },
        {
            title: 'Changes',
            icon: FaHistory,
            value: 90
        }
    ]

    return (
        <div className="statistics">

            {stats.map((stat: any) => (
                <StatBox title={stat.title} value={stat.value}>
                    {stat.icon()}
                </StatBox>
            ))}

        </div>
    )
}

export default Statistics;