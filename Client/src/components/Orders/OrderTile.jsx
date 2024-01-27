import React from "react";

const OrderTile = ({ item, removeFromCart }) => {
    return (
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
    );
};

export default OrderTile;