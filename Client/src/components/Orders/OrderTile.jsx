import React from "react";
import { useEffect } from "react";

const OrderTile = ({ item, removeFromCart, removeAllFromCart }) => {
    const isDiscounted = item.promotionPrice !== null && item.promotionPrice < item.price;

    return (
        <li key={item.id} className="product-tile">
            <img className="product-image" src={`https://localhost:7248/Files/${item.imageUrl}`} alt={item.name} />
            <div className="product-info">
                <div className="price-stock-container">
                    {isDiscounted ? (
                        <>
                            <p className="price">Price: <del>{item.price} zł</del></p>
                            <p className="price">{(item.promotionPrice)} zł</p>
                        </>
                    ) : (
                            <p className="price">Price: {item.price} zł</p>
                    )}
                    <p className="quantity">Quantity: {item.quantity}</p>
                </div>
                <h3 className="product-name">{item.name}</h3>
            </div>
            <div className="buttons-container">
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                {item.quantity > 1 && <button onClick={() => removeAllFromCart(item.id)}>Remove All</button>}
            </div>
        </li>
    );
};

export default OrderTile;