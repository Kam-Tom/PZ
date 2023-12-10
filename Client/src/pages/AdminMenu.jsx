import React from "react";
import { Link } from "react-router-dom";
import "../css/AdminMenu.css";

function AdminMenu({ onShowProducts, onShowAddProductForm, onShowProductList, onShowAddCategoryForm }) {
    return (
        <div className="admin-menu">
            <Link to="/" className="menu-item" onClick={onShowProducts}>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowAddCategoryForm}>
                <ion-icon name="add-circle-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowAddProductForm}>
                <ion-icon name="bag-add-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowProductList}>
                <ion-icon name="eye-outline"></ion-icon>
            </Link>
        </div>
    );
}

export default AdminMenu;