import React, { useEffect, useState } from 'react';
import { getAll, changeOptions} from '../../axios';
import { changeSubscribe } from '../../axios';
import './ProfileInfo.css';

function UserProfileInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const [newsletter, setNewsletter] = useState(null);
    const [confirmUnsubscribe, setConfirmUnsubscribe] = useState(false);
        
    async function fetchFromDatabase() {
        let items = await getAll(`https://localhost:7248/api/Users/GetByEmail`);
        console.log("TEST ",items);
        setUserInfo(items);
        setNewsletter(items.newsletterSubscription);
    }

    useEffect(() => {
        fetchFromDatabase();
    }, []);

    

    const handleSubscribeClick = () => {
        if (newsletter) {
            setConfirmUnsubscribe(true);
        } else {
            changeSubscribe(userInfo.id);
            setNewsletter(true);
        }
    };

    const handleUnsubscribeConfirm = (confirm) => {
        setConfirmUnsubscribe(false);
        if (confirm) {
            changeSubscribe(userInfo.id);
            setNewsletter(false);
        }
    };

    function handleCurrencyChange(event) {
        setUserInfo({
            ...userInfo,
            currency: event.target.value,
        });
        
    };
    function handleCurrencyChange2(event) {
        setUserInfo({
            ...userInfo,
            numOfProductOnPage: event.target.value
        });
    };
    const handleSubmitClick = async () => {
        console.log(userInfo);
        userInfo.currency = document.getElementById('selectbox1').value;
        userInfo.numOfProductOnPage = document.getElementById('selectbox2').value;
        console.log(userInfo);
        await changeOptions( userInfo.currency, userInfo.numOfProductOnPage);
        await fetchFromDatabase(); 

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
            <div className="selectboxes">
                <div style={{display: 'flex', alignItems: 'center'}}>
                <p style={{margin: '0 30px 0 0'}}>Select your waluta:</p>
                <select id="selectbox1" value={userInfo.currency || "zł"} onChange={handleCurrencyChange}>
                    <option value="zł">zł</option>
                    <option value="$">$</option>
                    <option value="€">€</option>
                    {/* Dodaj więcej opcji według potrzeb */}
                </select>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <p style={{margin: '0 30px 0 0'}}>Select your ilość na stronie:</p>
                <select id="selectbox2" value={userInfo.numOfProductOnPage || "8"} onChange={handleCurrencyChange2}>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    {/* Dodaj więcej opcji według potrzeb */}
                </select>
                </div>
                <button onClick={handleSubmitClick}>Save</button>
            </div>
        </div>
    );
}

export default UserProfileInfo;
