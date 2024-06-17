import React from "react";
import { useState, useEffect } from "react";
import { getAll } from "../../axios";
import "./OrderTile.css";

const OrderTile = ({ item, removeFromCart, removeAllFromCart, currencyRate, currency }) => {
    const [isItemAvailable, setIsItemAvailable] = useState(true);
    const isDiscounted = item.promotionNetto !== null && item.promotionNetto < item.netto;
    const isNetto = sessionStorage.getItem("bruttoNetto") === "netto";
    const [isPromotion, setIsPromotion] = useState(0);
    const [user, setUser] = useState(null);

    useEffect( () => {
        const checkItemAvailability = async () => {
        const itemInDataBase = await getAll(`https://localhost:7248/Product/${item.id}`);
        if (itemInDataBase.quantity < item.quantity) {
            setIsItemAvailable(false);
        }
        let user = await getAll(`https://localhost:7248/api/Users/GetByEmail`);
        if(Number(user.prodPromotion) === item.id){
            setUser(user);
            setIsPromotion(1);
        
        };
    };
    checkItemAvailability();
    }, []);
    return (
        <div>
            {isPromotion && (
            <li key={item.id} className="order-tile">
            <img className="product-image" src={`https://localhost:7248/Files/${item.imageUrl}`} alt={item.name} />
            <div className="product-info">
                <div className="price-stock-container">
                    {isDiscounted ? (
                        <div className="price-price-container">
                            <p className="price">Price: <del>{(item.netto / currencyRate).toFixed(2)} {currency}</del></p>
   
                            <p className="price">{(((item.netto * ((100 - Number(userInfo.prodValuePromotion))/100)) / currencyRate)).toFixed(2)} {currency}
                                {isNetto && <span>+Vat</span>}
                            </p>

                            
                        </div>
                    ) : (
                        <>
                                <p className="price">Price: <del>{(item.netto / currencyRate).toFixed(2)} {currency}</del></p>
                                <p className="price">Price: {(item.netto * ((100 - Number(user.prodValuePromotion))/100) / currencyRate).toFixed(2)} {currency}
                                    {isNetto && <span>+Vat</span>}</p>
                        </>
                    )}
                    <p className="quantity">Quantity: 1</p>
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
        )
        }
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
                    <p className="quantity">Quantity: {item.quantity - isPromotion}</p>
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
        
        </div>
    );
};

export default OrderTile;