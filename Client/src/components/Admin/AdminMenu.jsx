import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "./AdminMenu.css";

function AdminMenu({ onShowProducts, onShowAddProductForm, onShowAddPromotionForm, onShowAddShippingMethodForm, onShowProductList, onShowAddCategoryForm, onShowUserList, onShowReviewList, onShowOrderList, onShowStats }) {
    return (
        <div className="admin-menu">
            <Link to="/" className="menu-item" onClick={onShowProducts}>
                <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowAddCategoryForm}>
                <ion-icon name="add-circle-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowAddPromotionForm}>
                <ion-icon name="pricetag-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowAddShippingMethodForm}>
                <ion-icon name="car-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowAddProductForm}>
                <ion-icon name="bag-add-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowProductList}>
                <ion-icon name="eye-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowUserList}>
                <ion-icon name="person-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowReviewList}>
                <ion-icon name="book-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowOrderList}>
                <ion-icon name="cube-outline"></ion-icon>
            </Link>
            <Link to="/admin" className="menu-item" onClick={onShowStats}>
                <ion-icon name="bar-chart-outline"></ion-icon>
            </Link>
        </div>
    );
}

AdminMenu.propTypes = {
    onShowProducts: PropTypes.func.isRequired,
    onShowAddProductForm: PropTypes.func.isRequired,
    onShowAddPromotionForm: PropTypes.func.isRequired,
    onShowAddShippingMethodForm: PropTypes.func.isRequired,
    onShowProductList: PropTypes.func.isRequired,
    onShowAddCategoryForm: PropTypes.func.isRequired,
    onShowUserList: PropTypes.func.isRequired,
    onShowReviewList: PropTypes.func.isRequired,
    onShowOrderList: PropTypes.func.isRequired,
    onShowStats: PropTypes.func.isRequired
};

export default AdminMenu;