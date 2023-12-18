import React, { useCallback, useEffect, useState } from "react";
import { getAll, deleteElement } from "../../axios";
import "./ShoppingCart.css";


const ShoppingCart = ({ cartItems, setCartItems }) => {
    const [basket, setBasket] = useState([]);
    const [cost, setCost] = useState(0);
    async function fetch() {
        let items = await getAll(`https://localhost:7248/api/Shop/GetBasket`);
        setBasket(items);
    }
    useEffect(() => {
        fetch();
    }, []);

    const removeFromCart = async (productId) => {
        await deleteElement(`https://localhost:7248/api/Shop?productId=${productId}`)
        fetch();
        
      };

    return (
        <div className="shopping-cart-container">
            <h2>Your Shopping Cart</h2>
            {basket && basket.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items-list"> 
                            {basket?.items && basket.items.map((item) => (
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

export default ShoppingCart;