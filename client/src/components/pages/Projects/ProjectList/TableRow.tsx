import React, { useEffect, useState } from "react";

// Import Axios
import Axios from "axios";

// Import MobX Stuff
import { inject, observer } from "mobx-react";

// Import NavLink
import { NavLink } from "react-router-dom";

// Import Types
import { Iproject, IProjectStore, Iuser, IUsersStore } from "../../../../types";

// Props Interface
interface PropsI {
    project: Iproject;
    projectStore?: IProjectStore;
    usersStore?: IUsersStore;
}

let TableRow = ({ project, projectStore, usersStore }: PropsI) => {
    const [owner, setOwner]: any = useState<Iuser | {}>(
        usersStore!.users
            ? usersStore!.users.filter((user) => user._id === project.owner)[0]
            : {}
    );

    useEffect(() => {
        usersStore!.fetchUsers();
    }, [usersStore]);

    const deleteHandler = () => {
        Axios.delete(`/api/projects/${project._id}`)
            .then((res) => {
                projectStore!.fetchProjects();
                window.location.reload();
            })
            .catch((err) => {
                alert("An Error Occured");
            });
    };

    return (
        <tr className="row">
            <td className="table-data">{project.name}</td>
            <td className="table-data">{project.description}</td>
            <td className="table-data owner-td">
                {owner ? (
                    <>
                        <img
                            src={`${process.env.PUBLIC_URL}/uploads/profile/${owner.profileIcon}`}
                            className="profileIcon"
                            alt="Profile Icon"
                        />
                        <NavLink className="name" to={`/profile/${owner._id}`}>
                            {owner.name}
                        </NavLink>{" "}
                    </>
                ) : (
                    <div className="loader"></div>
                )}
            </td>
            <td className="table-data">
                <NavLink
                    className="btn-link-container"
                    to={`/project/${project._id}`}
                >
                    <button className="btn primary">View Project</button>
                </NavLink>
                <button className="btn danger" onClick={deleteHandler}>
                    Delete Project
                </button>
            </td>
        </tr>
    );
};

// Inject Store
TableRow = inject("projectStore", "usersStore")(observer(TableRow));

export default TableRow;
