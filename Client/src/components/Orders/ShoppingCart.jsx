import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getAll, deleteElement } from "../../axios";
import "./ShoppingCart.css";


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
                            <li key={item.id} className="product-tile">
                                <img className="product-image" src={`https://localhost:7248/Files/${item.imageUrl}`} alt={item.name} />
                                <div className="product-info">
                                    <div className="price-stock-container">
                                        <p className="price">Price: {item.price} zł</p>
                                    </div>
                                    <h3 className="product-name">{item.name}</h3>
                                </div>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
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