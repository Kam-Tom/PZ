import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getAll, deleteElement } from "../../axios";
import "./ShoppingCart.css";
import OrderTile from "./OrderTile";


const ShoppingCart = ({ cartItems, setCartItems }) => {
    async function fetchFromDatabase() {
        let items = await getAll(`https://localhost:7248/api/Shop/GetBasket`);
        setCartItems(items);
    }
    useEffect(() => {
        fetchFromDatabase();
    }, [cartItems.length]);

    const removeFromCart = async (productId) => {
        await deleteElement(`https://localhost:7248/api/Shop?productId=${productId}`)
        fetchFromDatabase();
        
    };

    return (
        <div className="shopping-cart-container">
            <h2>Your Shopping Cart</h2>
            {cartItems && cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items-list"> 
                        {cartItems?.items && cartItems.items.map((item) => (
                            <OrderTile item={item} removeFromCart={removeFromCart} />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

ShoppingCart.propTypes = {
    cartItems: PropTypes.any, // TODO: Add correct type (neither array nor object works)
    setCartItems: PropTypes.func.isRequired,
};

export default ShoppingCart;