import React, { useState } from "react";
import "./ProfilePage.css"
import OrderList from "./OrderList";
import ProfileMenu from "./ProfileMenu";

function ProfilePage() {
    const [showProfileInfo, setShowProfileInfo] = useState(true);
    const [showOrderList, setShowOrderList] = useState(false);

    const showProfileInfoFn = () => {
        setShowProfileInfo(true);
        setShowOrderList(false);
    };

    const showOrderListFn = () => {
        setShowProfileInfo(false);
        setShowOrderList(true);
    };

    return (
        <div className="userprofilecontainer">
            <ProfileMenu onShowProfileInfoFn={showProfileInfoFn} onShowOrderListFn={showOrderListFn} />
            {showOrderList && <OrderList />}
        </div>
    );
}

export default ProfilePage;