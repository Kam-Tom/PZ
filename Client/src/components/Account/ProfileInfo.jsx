import { useEffect, useState } from 'react';
import { getAll, update } from '../../axios';
import { changeSubscribe } from '../../axios';
import './ProfileInfo.css';

function UserProfileInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const [newsletter, setNewsletter] = useState(null);
    const [confirmUnsubscribe, setConfirmUnsubscribe] = useState(false);

    async function fetchFromDatabase() {
        let user = await getAll(`https://localhost:7248/api/Users/GetByEmail`);
        setUserInfo(user);
        setNewsletter(user.newsletterSubscription);
    }

    useEffect(() => {
        fetchFromDatabase();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

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

    const handleSubmitClick = async () => {
        userInfo.currency = document.getElementById('selectbox1').value;
        userInfo.numOfProductOnPage = document.getElementById('selectbox2').value;
        userInfo.bruttoNetto = document.getElementById('selectbox3').value;
        await update('https://localhost:7248/api/Users/ChangeOptions',userInfo);
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

            <hr />

            <div className="selectboxes">
                <div className="selectbox">
                    <p>Select your currency:</p>
                    <select id="selectbox1" name="currency" value={userInfo.currency || "zł"} onChange={handleInputChange}>
                        <option value="zł">zł</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                        {/* Dodaj więcej opcji według potrzeb */}
                    </select>
                </div>
                <div className="selectbox">
                    <p>Select your amount on webside:</p>
                    <select id="selectbox2" name="numOfProductOnPage" value={userInfo.numOfProductOnPage || "8"} onChange={handleInputChange}>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        {/* Dodaj więcej opcji według potrzeb */}
                    </select>
                </div>
                <div className="selectbox">
                    <p>Select brutto/netto:</p>
                    <select id="selectbox3" name="bruttoNetto" value={userInfo.bruttoNetto || "brutto"} onChange={handleInputChange}>
                        <option value="brutto">Brutto</option>
                        <option value="netto">Netto</option>
                    </select>
                </div>
                <button onClick={handleSubmitClick}>Save</button>
            </div>
        </div>
    );
}

export default UserProfileInfo;
