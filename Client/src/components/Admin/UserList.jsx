import React, { useState } from "react";
import "./UserList.css"

function UserList({ users, onEditUser, onDeleteUser }) {
    const [selectedUser, setSelectedUser] = useState(null);

    const onSelectUser = (user) => {
        setSelectedUser(selectedUser === user ? null : user);
    };

    const handleEditClick = (user) => {
        onEditUser(user);
    };

    const handleDeleteClick = (user) => {
        onDeleteUser(user);
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
                                    <td>{`${user.firstName} ${user.lastName}`}</td>
                                    <td>{user.email}</td>
                                </tr>
                                {selectedUser === user && (
                                    <tr>
                                        <td colSpan="2">
                                            <div className="user-details">
                                                <div className="user-info">
                                                    <h3>Name: {`${user.firstName} ${user.lastName}`}</h3>
                                                    <p>Email: {user.email}</p>
                                                    <p>Adress: {user.address}</p>
                                                    <p>Phone Number: {user.phoneNumber}</p>
                                                    <div>
                                                        <button onClick={() => handleDeleteClick(user)}>Delete</button>
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
