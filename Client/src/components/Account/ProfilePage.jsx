import React, { useState } from "react";
import "./ProfilePage.css"
import OrderList from "./OrderList";
import ProfileMenu from "./ProfileMenu";
import ProfileInfo from "./ProfileInfo";

function ProfilePage({ onSettingChange, listProduct, rate }) {
    const [showProfileInfo, setShowProfileInfo] = useState(true);
    const [showOrderList, setShowOrderList] = useState(false);

    const showProfileInfoFn = () => {
        setShowProfileInfo(true);
        setShowOrderList(false);
        console.log(listProduct);
    };

    const showOrderListFn = () => {
        setShowProfileInfo(false);
        setShowOrderList(true);
    };

    const handleUserInfoUpdate = (newInfo) => {
        onUserInfoUpdate(newInfo);
    };

    return (
        <div className="userprofilecontainer">
            <ProfileMenu onShowProfileInfoFn={showProfileInfoFn} onShowOrderListFn={showOrderListFn} />
            {showOrderList && <OrderList />}
            {showProfileInfo && <ProfileInfo onSettingChange={onSettingChange} listProduct = {listProduct} rate = {rate} />}
        </div>
    );
}

export default ProfilePage;