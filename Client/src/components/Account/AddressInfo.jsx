import React, { useState, useEffect } from 'react';
import './AddressInfo.css';

const AddressInfo = () => {
    const [editMode, setEditMode] = useState(false);
    const [address, setAddress] = useState({
        street: '',
        housenumber: '',
        apartmentnumber: '',
        city: '',
        postalcode: ''
    });

    useEffect(() => {
        const savedAddress = localStorage.getItem('address');
        if (savedAddress) {
            setAddress(JSON.parse(savedAddress));
        }
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

    const handleSave = () => {
        localStorage.setItem('address', JSON.stringify(address));
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
                    <input type="number" name="houseNumber" value={address.houseNumber} onChange={handleInputChange} disabled={!editMode} />
                </div>
                <div className="selectbox">
                    <p>Apartment Number</p>
                    <input type="number" name="apartmentNumber" value={address.apartmentNumber} onChange={handleInputChange} disabled={!editMode} />
                </div>
                <div className="selectbox">
                    <p>City</p>
                    <input type="text" name="city" value={address.city} onChange={handleInputChange} disabled={!editMode} />
                </div>
                <div className="selectbox">
                    <p>Postal Code</p>
                    <input type="number" name="postalCode" value={address.postalCode} onChange={handleInputChange} disabled={!editMode} />
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