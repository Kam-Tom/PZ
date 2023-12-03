import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
    return (
        <header className="header">
            <Link to="/" className="logo">
                Miejsce na logo
            </Link>
            <nav className="navbar">
                <Link to="/login-register">
                    <ion-icon name="person-outline"></ion-icon>
                </Link>
                <Link to="/admin">
                    <ion-icon name="construct-outline"></ion-icon>
                </Link>
            </nav>
        </header>
    );
}

export default Navbar;