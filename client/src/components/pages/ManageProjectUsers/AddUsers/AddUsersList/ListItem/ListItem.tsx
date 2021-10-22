import React, { useEffect, useState } from "react";

// Import Styling
import "./ListItem.scss";

// Import Axios
import Axios from "axios";

// Import NavLink
import { NavLink } from "react-router-dom";

// Import MobX Stuff
import { inject, observer } from "mobx-react";

// Import types
import { IAuthStore, Iuser, IUsersStore } from "../../../../../../types";

// Props Interface
interface IProps {
    userId: string;
    authStore?: IAuthStore;
    projectId: string;
    usersStore?: IUsersStore;
}

// Request Body Interface
interface IRequestBody {
    userId: string;
    addedUserId: string;
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

    const addUserHandler = () => {
        const body: IRequestBody = {
            userId: authStore!.user.id,
            addedUserId: user._id,
        };

        Axios.put(`/api/projects/${projectId}/adduser`, body)
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
                                src={`${process.env.PUBLIC_URL}/uploads/profile/${user.profileIcon}`}
                                alt="Profile Icon"
                            />

                            <p className="name">{user.name}</p>
                        </NavLink>

                        <button
                            className="btn primary"
                            onClick={addUserHandler}
                        >
                            Add
                        </button>
                    </li>
                </>
            ) : (
                ""
            )}
        </>
    );
};

// Inject Store
ListItem = inject("authStore", "usersStore")(observer(ListItem));

export default ListItem;
