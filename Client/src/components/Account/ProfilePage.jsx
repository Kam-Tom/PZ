import React, { useState } from "react";
import "./ProfilePage.css"
import OrderList from "./OrderList";
import ProfileMenu from "./ProfileMenu";
import ProfileInfo from "./ProfileInfo";
import AddressInfo from "./AddressInfo";

function ProfilePage({ onSettingChange, listProduct, rate }) {
    const [showProfileInfo, setShowProfileInfo] = useState(true);
    const [showOrderList, setShowOrderList] = useState(false);
    const [showAddress, setShowAddress] = useState(false);

    const showProfileInfoFn = () => {
        setShowProfileInfo(true);
        setShowOrderList(false);
        setShowAddress(false);
        console.log(listProduct);
    };

    const showOrderListFn = () => {
        setShowProfileInfo(false);
        setShowOrderList(true);
        setShowAddress(false);
    };

    const showAddressFn = () => {
        setShowProfileInfo(false);
        setShowOrderList(false);
        setShowAddress(true);
    };

    const handleUserInfoUpdate = (newInfo) => {
        onUserInfoUpdate(newInfo);
    };

    return (
        <div className="userprofilecontainer">
            <ProfileMenu onShowProfileInfoFn={showProfileInfoFn} onShowOrderListFn={showOrderListFn} onShowAddressFn={showAddressFn} />
            {showOrderList && <OrderList />}
            {showProfileInfo && <ProfileInfo onSettingChange={onSettingChange} listProduct = {listProduct} rate = {rate} />}
            {showAddress && <AddressInfo />}
        </div>
    );
}

export default ProfilePage;