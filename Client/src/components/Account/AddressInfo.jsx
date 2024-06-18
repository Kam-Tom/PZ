import React, { useState, useEffect } from 'react';
import './AddressInfo.css';
import { update, getAll } from '../../axios';

const AddressInfo = () => {
    const [editMode, setEditMode] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [address, setAddress] = useState({
        street: '',
        housenumber: '',
        apartmentnumber: '',
        city: '',
        postalcode: ''
    });

    useEffect(() => {
        const loadData = async () => {
            const userData = await getAll(`https://localhost:7248/api/Users/GetByEmail`);

            setUserInfo(userData);


            if (!userData.shippingAddress) return;
            const savedAddress = userData.shippingAddress.split('\n');

            setAddress({
                street: savedAddress[0] || '',
                housenumber: savedAddress[1] || '',
                apartmentnumber: savedAddress[2] || '',
                city: savedAddress[3] || '',
                postalcode: savedAddress[4] || ''
            });
        };
        loadData();
    }, []);

    const handleInputChange = (event) => {
        setAddress({
            ...address,
            [event.target.name]: event.target.value
        });
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        const updatedUserInfo = {
            ...userInfo,
            shippingAddress: `${address.street}\n${address.housenumber}\n${address.apartmentnumber}\n${address.city}\n${address.postalcode}`
        };
        await update('https://localhost:7248/api/Users/ChangeOptions', updatedUserInfo);
        setUserInfo(updatedUserInfo);
        setEditMode(false);
    };

    return (
        <div className="user-profile">
            <h2>Address Information</h2>
            <form>
                <div className="selectbox">
                    <p>Street</p>
                    <input type="text" name="street" value={address.street} onChange={handleInputChange} disabled={!editMode} />
                </div>
                <div className="selectbox">
                    <p>House Number</p>
                    <input type="number" name="housenumber" value={address.housenumber} onChange={handleInputChange} disabled={!editMode} />
                </div>
                <div className="selectbox">
                    <p>Apartment Number</p>
                    <input type="number" name="apartmentnumber" value={address.apartmentnumber} onChange={handleInputChange} disabled={!editMode} />
                </div>
                <div className="selectbox">
                    <p>City</p>
                    <input type="text" name="city" value={address.city} onChange={handleInputChange} disabled={!editMode} />
                </div>
                <div className="selectbox">
                    <p>Postal Code</p>
                    <input type="number" name="postalcode" value={address.postalcode} onChange={handleInputChange} disabled={!editMode} />
                </div>
                <div className="selectboxes">
                    <button type="button" onClick={handleEdit} disabled={editMode}>Edit</button>
                    <button type="button" onClick={handleSave} disabled={!editMode}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddressInfo;
