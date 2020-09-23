import React from 'react';

// Import Styling
import './Statistics.scss';

// Import Icons
import { FaUsers, FaTags, FaHistory, FaFolderOpen } from 'react-icons/fa';

// Import StatBox Component
import StatBox from './StatBox';

// Import Stat type
import { IStat } from '../../../../types';

const Statistics = () => {


    // TODO - Update values from database when features are added
    const stats: IStat[] = [
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
                <StatBox title={stat.title} value={stat.value} key={stat.title}>

                    {stat.icon()}

                </StatBox>
            ))}

        </div>
    )
}

export default Statistics;