import React, { useEffect } from 'react';

// Import Styling
import './Statistics.scss';

// Import Icons
import { FaUsers, FaTags, FaHistory, FaFolderOpen } from 'react-icons/fa';

// Import StatBox Component
import StatBox from './StatBox';

// Import types
import { IChangeStore, IProjectStore, IStat, ITicketStore, IUsersStore } from '../../../../types';

// Import Mobx stuff
import { inject, observer } from 'mobx-react';

// Props Interface
interface PropsI {
    usersStore?: IUsersStore,
    changeStore?: IChangeStore,
    projectStore?: IProjectStore,
    ticketStore?: ITicketStore
}
let Statistics = ({ usersStore, changeStore, projectStore, ticketStore }: PropsI) => {

    useEffect(() => {
        usersStore!.fetchUsers();
        projectStore!.fetchProjects();
        ticketStore!.fetchTickets();
    }, [usersStore, projectStore, ticketStore]);

    const stats: IStat[] = [
        {
            title: 'Projects',
            icon: FaFolderOpen,
            value: projectStore && projectStore.projectCount
        },
        {
            title: 'Users',
            icon: FaUsers,
            value: usersStore && usersStore.userCount
        },
        {
            title: 'Tickets',
            icon: FaTags,
            value: ticketStore && ticketStore.ticketCount
        },
        {
            title: 'Changes',
            icon: FaHistory,
            value: changeStore && changeStore.changeCount
        }
    ]

    return (
        <div className="statistics">

            {stats.map((stat) => (
                <StatBox title={stat.title} value={stat.value} key={stat.title}>

                    {stat.icon()}

                </StatBox>
            ))}

        </div>
    )
}

// Inject Stores
Statistics = inject('usersStore', 'changeStore', 'projectStore', 'ticketStore')(observer(Statistics));

export default Statistics;