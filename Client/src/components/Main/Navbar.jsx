import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import "./Navbar.css";
import AppNotification from "./AppNotification";
import "./AppNotification.css";
import { getRole } from "../../axios";

function Navbar({ onSearch, notification, setNotification }) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    const handleLogout = () => {
        localStorage.removeItem("loginToken");
        localStorage.removeItem("role");
    };

    return (
        <header className="header">
            <Link to="/" className="logo" onClick={handleLogoClick}>
                DreamyGadget
            </Link>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <nav className="navbar">
                {getRole() ? 
                    <Link to="/profile">
                        <ion-icon name="person-outline"></ion-icon>
                    </Link>
                    :
                    <Link to="/account">
                        <ion-icon name="person-outline"></ion-icon>
                    </Link>
                }
                {getRole() == "Admin" && <Link to="/admin">
                    <ion-icon name="construct-outline"></ion-icon>
                </Link>}
                <Link to="/order">
                    <ion-icon name="cart-outline"></ion-icon>
                </Link>
                {notification.show && 
                    <AppNotification 
                        message={notification.message} 
                        onClose={() => setNotification({ show: false, message: '' })} 
                    />
                }
                {getRole() &&
                    <Link to="/" onClick={handleLogout}>
                            <ion-icon name="log-out-outline"></ion-icon>
                    </Link>
                }
            </nav>
        </header>
    );
}

Navbar.propTypes = {
    onSearch: PropTypes.func,
    notification: PropTypes.shape({
        show: PropTypes.bool,
        message: PropTypes.string,
    }),
    setNotification: PropTypes.func,
};

export default Navbar;