import React, { useState, useEffect } from "react";
import "./UserList.css";
import { deleteElement, getAll } from "../../axios";

function UserList() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    async function fetchUsers() {
        let items = await getAll("https://localhost:7248/api/Users/Get");
        setUsers(items);
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const onSelectUser = (user) => {
        setSelectedUser(selectedUser === user ? null : user);
    };

    const handleEditClick = (user) => {
        onEditUser(user);
    };

    const handleDeleteClick = async (userId) => {
        await deleteElement(`https://localhost:7248/api/Users?userId=${userId}`);
        fetchUsers();
    };

    return (
        <div className="user-list-container">
            <div className="user-details-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <React.Fragment key={index}>
                                <tr className={`user-list-item ${selectedUser === user ? "active" : ""}`} onClick={() => onSelectUser(user)}>
                                    <td>{`${user.username}`}</td>
                                    <td>{user.email}</td>
                                </tr>
                                {selectedUser === user && (
                                    <tr>
                                        <td colSpan="2">
                                            <div className="user-details">
                                                <div className="user-info">
                                                    <h3>Name: {`${user.username}`}</h3>
                                                    <p>Email: {user.email}</p>
                                                    <div>
                                                        <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
