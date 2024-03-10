import React, { useEffect, useState } from 'react';
import { getAll } from '../../axios';
import './ProfileInfo.css';

function UserProfileInfo() {
    const [userInfo, setUserInfo] = useState(null);
        
    async function fetchFromDatabase() {
        let items = await getAll(`https://localhost:7248/api/Users/GetByEmail`);
        console.log("TEST ",items);
        setUserInfo(items);
    }
    useEffect(() => {
        fetchFromDatabase();
    }, []);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p>Email: {userInfo.email}</p>
            <p>Username: {userInfo.username}</p>
        </div>
    );
}

export default UserProfileInfo;
