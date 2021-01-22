import React, { useState } from 'react'

// Import Axios
import Axios from 'axios';

// Import MobX Stuff
import { inject, observer } from 'mobx-react';

// Impor types 
import { IAuthStore, Iuser } from '../../../../types';

// Props Interface
interface PropsI {
    user: Iuser,
    authStore?: IAuthStore
}

// Role Option Interface
interface IRoleOption {
    displayName: string,
    value: string
}

let TableRow = ({ user, authStore }: PropsI) => {

    const [role, setRole] = useState(user.role);

    const [isChanged, setIsChanged] = useState<boolean>(false);

    const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setIsChanged(e.target.value !== user.role);

        setRole(e.target.value);

    }

    const date: Date = new Date(user.createdOn);

    const roleOptions: IRoleOption[] = [
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
        Axios.put(`/api/users/${user._id}/update/role`, { role, userId: authStore!.user.id }).then(res => {

            // Success
            setRole(res.data.role);
            alert('Successfully Updated');
            window.location.reload();

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
                <select defaultValue={role} onChange={selectChangeHandler} disabled={user._id === authStore!.user.id} className={isChanged ? 'changed' : ''} >

                    {roleOptions.map((roleOption) => {
                        return <option value={roleOption.value} key={roleOption.value}>{roleOption.displayName as string}</option>
                    })}

                </select>
                <button className="btn primary" onClick={updateHandler} disabled={user._id === authStore!.user.id}>Update</button>
            </td>
        </tr>
    )
}

// Inject Store
TableRow = inject('authStore')(observer(TableRow));

export default TableRow
