import React from "react";
import { Link } from "react-router-dom";
import "./ProfileMenu.css";

function ProfileMenu({ onShowProfileInfoFn, onShowOrderListFn}) {
    return (
        <div className="profile-menu">
            <Link to="/" className="menu-item">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
            <Link to="/profile" className="menu-item" onClick={onShowProfileInfoFn}>
                <ion-icon name="information-circle-outline"></ion-icon>
            </Link>
            <Link to="/profile" className="menu-item" onClick={onShowOrderListFn}>
                <ion-icon name="bag-check-outline"></ion-icon>
            </Link>
        </div>
    );
}

export default ProfileMenu;