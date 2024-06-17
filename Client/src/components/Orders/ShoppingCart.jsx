import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getAll, deleteElement } from "../../axios";
import "./ShoppingCart.css";
import OrderTile from "./OrderTile";

const ShoppingCart = ({ cartItems, setCartItems, currencyRate, currency }) => {

    const [prodPromotion, setProdPromotion] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    async function fetchFromDatabase() {
        let user = await getAll(`https://localhost:7248/api/Users/GetByEmail`);
        setUserInfo(user); 
        let items = await getAll(`https://localhost:7248/api/Shop/GetBasket`);
        let vatRates = await getAll("https://localhost:7248/Vat");
        let bruttoCost = 0;
        const isNetto = sessionStorage.getItem("bruttoNetto") === "netto";
        console.log(items.items);
        for (const item of items.items)
        {
            const vatRate = vatRates.find(v => v.Name === item.vatType).Rate;
            const price = (item.netto * (1 + vatRate / 100)).toFixed(2);
            const promotionPrice = (item.promotionNetto * (1 + vatRate / 100)).toFixed(2);

            if (!isNetto) {
                item.price = price;
                item.promotionPrice = item.promotionNetto !== undefined ? promotionPrice : null;
            }
            else {
                item.price = item.netto;
                item.promotionPrice = item.promotionNetto !== undefined ? item.promotionNetto : null;
            }
            if (item.id == Number(user.prodPromotion)) {
                setProdPromotion(item);
                prodPromotion.id = 0;
                console.log('--------------------------------');
                console.log(prodPromotion);
                console.log(item);
                //item.quantity -=1;
            }
            bruttoCost += item.promotionPrice !== null ? item.promotionPrice * item.quantity : item.price * item.quantity;
        }
        items.bruttoCost = bruttoCost;
        console.log(items);
        setCartItems(items);
    }
    useEffect(() => {
        fetchFromDatabase();
    }, []);

    const removeFromCart = async (productId) => {
        await deleteElement(`https://localhost:7248/api/Shop?productId=${productId}&amount=1`)
        fetchFromDatabase();
    };

    const removeAllFromCart = async (productId, quantity) => {
        await deleteElement(`https://localhost:7248/api/Shop?productId=${productId}&amount=${quantity}`)
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
                        {cartItems?.items && cartItems.items.map((item,key) => (
                            <OrderTile key={key} item={item} currencyRate={currencyRate} currency={currency} removeFromCart={removeFromCart} removeAllFromCart={() => removeAllFromCart(item.id, item.quantity)} />
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