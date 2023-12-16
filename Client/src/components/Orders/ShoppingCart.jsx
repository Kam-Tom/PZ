import React, { useEffect } from "react";
import "./ShoppingCart.css";


const ShoppingCart = ({ cartItems, setCartItems }) => {

    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) => {
            const indexToRemove = prevCartItems.findIndex((item) => item.id === productId);
            if (indexToRemove !== -1) {
                const updatedCartItems = [...prevCartItems.slice(0, indexToRemove), ...prevCartItems.slice(indexToRemove + 1)];
                return updatedCartItems;
            }
            return prevCartItems;
        });
      };

    return (
        <div className="shopping-cart-container">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items-list">
                        {cartItems.map((item) => (
                            <li key={item.id} className="product-tile">
                                <img className="product-image" src={`https://localhost:7248/Files/${item.image}`} alt={item.name} />
                                <div className="product-info">
                                    <div className="price-stock-container">
                                        <p className="price">Price: {item.price}</p>
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

export default ShoppingCart;