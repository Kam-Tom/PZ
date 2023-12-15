import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <header className="header">
            <Link to="/" className="logo">
                Miejsce na logo
            </Link>
            <nav className="navbar">
                <Link to="/account">
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