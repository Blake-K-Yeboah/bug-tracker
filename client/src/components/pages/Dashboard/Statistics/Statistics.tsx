import React, { useEffect } from 'react';

// Import Styling
import './Statistics.scss';

// Import Icons
import { FaUsers, FaTags, FaHistory, FaFolderOpen } from 'react-icons/fa';

// Import StatBox Component
import StatBox from './StatBox';

// Import types
import { IStat, IStoreProps } from '../../../../types';

// Import Mobx stuff
import { inject, observer } from 'mobx-react';

let Statistics = ({ usersStore, changeStore, projectStore, ticketStore }: IStoreProps) => {


    // TODO - Update values from database when features are added
    useEffect(() => {
        usersStore.fetchUsers();
        projectStore.fetchProjects();
        ticketStore.fetchTickets();
    }, [usersStore, projectStore]);

    const stats: IStat[] = [
        {
            title: 'Projects',
            icon: FaFolderOpen,
            value: projectStore.projectCount
        },
        {
            title: 'Users',
            icon: FaUsers,
            value: usersStore.userCount
        },
        {
            title: 'Tickets',
            icon: FaTags,
            value: ticketStore.ticketCount
        },
        {
            title: 'Changes',
            icon: FaHistory,
            value: changeStore.changeCount
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

Statistics = inject('usersStore', 'changeStore', 'projectStore', 'ticketStore')(observer(Statistics));

export default Statistics;