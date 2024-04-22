import React, { useEffect, useState } from 'react';
import { getAll } from '../../axios';
import './ProfileInfo.css';

function UserProfileInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const [newsletter, setNewsletter] = useState(false);
    const [confirmUnsubscribe, setConfirmUnsubscribe] = useState(false);
        
    async function fetchFromDatabase() {
        let items = await getAll(`https://localhost:7248/api/Users/GetByEmail`);
        console.log("TEST ",items);
        setUserInfo(items);
    }

    useEffect(() => {
        fetchFromDatabase();
    }, []);

    const handleSubscribeClick = () => {
        if (newsletter) {
            setConfirmUnsubscribe(true);
        } else {
            setNewsletter(true);
        }
    };

    const handleUnsubscribeConfirm = (confirm) => {
        setConfirmUnsubscribe(false);
        if (confirm) {
            setNewsletter(false);
        }
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p>Email: {userInfo.email}</p>
            <p>Username: {userInfo.username}</p>
            <p className="bold-text">Subscribe to newsletter</p>
            <button className={newsletter ? 'subscribe-button subscribed' : 'subscribe-button'} onClick={handleSubscribeClick}>
                SUBSCRIBE
            </button>
            <div className="confirm-buttons">
                {confirmUnsubscribe && (
                    <>
                        <div className="confirm-text">
                            <p className="bold-text">Are you sure you want to unsubscribe?</p>
                        </div>
                        <div className="confirm-actions">
                            <button className="confirm-button no" onClick={() => handleUnsubscribeConfirm(false)}>No</button>
                            <button className="confirm-button yes" onClick={() => handleUnsubscribeConfirm(true)}>Yes</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserProfileInfo;
