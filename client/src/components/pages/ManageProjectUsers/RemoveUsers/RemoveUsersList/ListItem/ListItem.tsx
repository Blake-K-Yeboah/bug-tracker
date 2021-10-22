import React, { useEffect, useState } from "react";

// Import Styling
import "./ListItem.scss";

// Import Axios
import Axios from "axios";

// Import NavLink
import { NavLink } from "react-router-dom";

// Import MobX Stuff
import { inject, observer } from "mobx-react";

// Import Types
import { IAuthStore, Iuser, IUsersStore } from "../../../../../../types";

// Props Interface
interface IProps {
    userId: string;
    authStore?: IAuthStore;
    projectId: string;
    usersStore?: IUsersStore;
}
let ListItem = ({ userId, authStore, projectId, usersStore }: IProps) => {
    const [user, setUser]: any = useState<Iuser | {}>(
        usersStore!.users
            ? usersStore!.users.filter((user) => user._id === userId)[0]
            : {}
    );

    useEffect(() => {
        usersStore!.fetchUsers();
    }, [usersStore]);

    const removeUserHandler = () => {
        const body = {
            userId: authStore!.user.id,
            removedUserId: user._id,
        };

        Axios.put(`/api/projects/${projectId}/removeuser`, body)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                alert("An error Occured");
            });
    };

    return (
        <>
            {user ? (
                <>
                    <li className="list-item">
                        <NavLink
                            to={`/profile/${user._id}`}
                            className="content"
                        >
                            <img
                                className="profile-icon"
                                src={
                                    user !== {}
                                        ? `${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`
                                        : ""
                                }
                                alt="Profile Icon"
                            />

                            <p className="name">{user.name}</p>
                        </NavLink>

                        <button
                            className="btn danger"
                            onClick={removeUserHandler}
                        >
                            Remove
                        </button>
                    </li>
                </>
            ) : (
                ""
            )}
        </>
    );
};

ListItem = inject("authStore", "usersStore")(observer(ListItem));

export default ListItem;
