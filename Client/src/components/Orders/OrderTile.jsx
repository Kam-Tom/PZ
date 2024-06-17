import React from "react";
import { useState, useEffect } from "react";
import { getAll } from "../../axios";
import "./OrderTile.css";

const OrderTile = ({ item, removeFromCart, removeAllFromCart, currencyRate, currency }) => {
    const [isItemAvailable, setIsItemAvailable] = useState(true);
    const isDiscounted = item.promotionNetto !== null && item.promotionNetto < item.netto;
    const isNetto = sessionStorage.getItem("bruttoNetto") === "netto";

    useEffect( () => {
        const checkItemAvailability = async () => {
        const itemInDataBase = await getAll(`https://localhost:7248/Product/${item.id}`);
        if (itemInDataBase.quantity < item.quantity) {
            setIsItemAvailable(false);
        }
    };
    checkItemAvailability();
    }, []);
    return (
        <li key={item.id} className="order-tile">
            <img className="product-image" src={`https://localhost:7248/Files/${item.imageUrl}`} alt={item.name} />
            <div className="product-info">
                <div className="price-stock-container">
                    {isDiscounted ? (
                        <div className="price-price-container">
                            <p className="price">Price: <del>{(item.netto / currencyRate).toFixed(2)} {currency}</del></p>
   
                            <p className="price">{((item.promotionNetto / currencyRate)).toFixed(2)} {currency}
                                {isNetto && <span>+Vat</span>}
                            </p>

                            
                        </div>
                    ) : (
                        <>
                                <p className="price">Price: {(item.netto / currencyRate).toFixed(2)} {currency}
                                    {isNetto && <span>+Vat</span>}</p>
                        </>
                    )}
                    <p className="quantity">Quantity: {item.quantity}</p>
                </div>
                <h3 className="product-name">{item.name}</h3>
            </div>
            <div className="buttons-container">
                {!isItemAvailable ? (
                    <>
                        <p style={{ color: 'red' }} >Product quantity exceeds available stock</p>
                        <button onClick={() => removeAllFromCart(item.id)}>Remove</button>
                    </>
                ) : (
                    <>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    {item.quantity > 1 && <button onClick={() => removeAllFromCart(item.id)}>Remove All</button>}
                    </>
                )}   
            </div>
        </li>
    );
};

export default OrderTile;