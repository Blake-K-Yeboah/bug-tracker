import React, { useState } from 'react'
import Axios from 'axios';
import { inject, observer } from 'mobx-react';

let TableRow = ({ user, authStore }: any) => {

    const [role, setRole] = useState(user.role);

    const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setRole(e.target.value);

    }

    const date: Date = new Date(user.createdOn);

    const roleOptions: any = [
        {
            displayName: 'Admin',
            value: 'admin'
        },
        {
            displayName: 'Project Manager',
            value: 'project-manager'
        },
        {
            displayName: 'Developer',
            value: 'developer'
        },
        {
            displayName: 'Submitter',
            value: 'submitter'
        }
    ];

    const updateHandler = () => {
        Axios.put(`/api/users/${user._id}/update/role`, { role, userId: authStore.user.id }).then(res => {
            // Success
            setRole(res.data.role);
            alert('Successfully Updated')
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <tr className="row">
            <td className="table-data">
                {user.name}
            </td>
            <td className="table-data">
                {user.email}
            </td>
            <td className="table-data">
                {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </td>
            <td className="table-data role-td">
                <select defaultValue={role} onChange={selectChangeHandler} disabled={user._id === authStore.user.id}>

                    {roleOptions.map((roleOption: any) => {
                        return <option value={roleOption.value} key={roleOption.value}>{roleOption.displayName as string}</option>
                    })}

                </select>
                <button className="btn primary" onClick={updateHandler} disabled={user._id === authStore.user.id}>Update</button>
            </td>
        </tr>
    )
}

TableRow = inject('authStore')(observer(TableRow));

export default TableRow
