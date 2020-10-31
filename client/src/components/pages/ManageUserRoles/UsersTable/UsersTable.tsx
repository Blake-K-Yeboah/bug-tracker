import React, { useEffect } from 'react'

// Import Styling
import './UsersTable.scss';

// Import MOBX Stuff
import { inject, observer } from 'mobx-react';

// Import types
import { IStoreProps, Iuser } from '../../../../types';

// Import Spinner for loading
import Spinner from '../../../Spinner/Spinner';
import TableRow from './TableRow';

let UsersTable = ({ usersStore }: IStoreProps) => {

    useEffect(() => {
        usersStore.fetchUsers();
    }, [usersStore]);

    return (
        <div className="users-table-container">

            <h2 className="table-title">Table of Users</h2>

            {!usersStore.users ? <Spinner /> :
                <table className="users-table">
                    <thead>
                        <tr className="head-row">
                            <th className="t-head">
                                Name
                            </th>
                            <th className="t-head">
                                Email
                            </th>
                            <th className="t-head">
                                Created
                            </th>
                            <th className="t-head">
                                Role
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersStore.users.map((user: Iuser) => {
                            return <TableRow user={user} key={user._id} />
                        })}
                    </tbody>
                </table>
            }

            {usersStore.userCount > 9 ? <div className="blocker"></div> : ''}

        </div>
    )
}

UsersTable = inject('usersStore')(observer(UsersTable));

export default UsersTable
