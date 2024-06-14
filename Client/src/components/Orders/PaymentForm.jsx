import React, { useState, useEffect } from "react";
import { getAll, buy } from "../../axios";
import PropTypes from 'prop-types';
import "./PaymentForm.css";
import "../Main/AppNotification.css";
import AppNotification from "../Main/AppNotification";

const PaymentForm = ({ cartTotal, setProducts, setCartItems, currencyRate, currency }) => {
    const isNetto = sessionStorage.getItem("bruttoNetto") === "netto";
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [email, setEmail] = useState("");
    const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);
    const [isCardNumberValid, setIsCardNumberValid] = useState(false);
    const [isCvcValid, setIsCvcValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [blikCode, setBlikCode] = useState("");
    const [isBlikCodeValid, setIsBlikCodeValid] = useState(false);
    const [notification, setNotification] = useState(false);


    async function handleSubmit(event)
    {
        event.preventDefault();
        await buy();
        cartTotal = []
        setProducts(await getAll("https://localhost:7248/Product"));
        setCartItems(await getAll("https://localhost:7248/api/Shop/GetBasket"));
        setCardNumber("");
        setExpiryDate("");
        setCvc("");
        setEmail("");
        setBlikCode("");
        if (isCardNumberValid && isExpiryDateValid && isCvcValid && isEmailValid) {
            setNotification(true);
        }
    };

    const handleCardNumberChange = (e) => {
        const formattedCardNumber = e.target.value.replace(/[^0-9]/g, "").slice(0, 16);
        setCardNumber(formattedCardNumber);
        setIsCardNumberValid(formattedCardNumber.length === 16);
    };

    const handleExpiryDateChange = (e) => {
        let formattedExpiryDate = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);

        if (formattedExpiryDate.length > 2) {
            formattedExpiryDate = formattedExpiryDate.slice(0, 2) + "/" + formattedExpiryDate.slice(2);

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;

            const enteredMonth = parseInt(formattedExpiryDate.slice(0, 2));
            const enteredYear = parseInt(formattedExpiryDate.slice(3));

            const isMonthValid = enteredMonth >= 1 && enteredMonth <= 12;
            const isYearValid = enteredYear > currentYear || (enteredYear === currentYear && enteredMonth >= currentMonth);

            setIsExpiryDateValid(isMonthValid && isYearValid);
        }

        setExpiryDate(formattedExpiryDate);
    };

    const handleCvcChange = (e) => {
        const formattedCvc = e.target.value.replace(/[^0-9]/g, "").slice(0, 3);
        setCvc(formattedCvc);
        setIsCvcValid(formattedCvc.length === 3);
    };

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail));
    };

    const handleBlikCodeChange = (e) => {
        const formattedBlikCode = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
        setBlikCode(formattedBlikCode);
        setIsBlikCodeValid(formattedBlikCode.length === 6);
    };

    return (
        <div className="payment-form-container">
            {paymentMethod && (
                <div className="back-button orange-arrow" onClick={() => setPaymentMethod(null)}>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
            )}
            <h2>Payment Form</h2>
            {!paymentMethod ? (
                <div className="payment-method-selection">
                    <button onClick={() => setPaymentMethod("card")}>Pay with Card</button>
                    <button onClick={() => setPaymentMethod("blik")}>Pay with Blik</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {paymentMethod === "card" && (
                        <div className="card-payment-form">
                            <label>
                                Card Number:
                                <input 
                                    type="text" 
                                    inputMode="numeric" 
                                    pattern="[0-9]*" 
                                    placeholder="Enter your card number" 
                                    value={cardNumber} 
                                    onChange={handleCardNumberChange} 
                                    className={!cardNumber || !isCardNumberValid ? 'invalid' : 'valid'} 
                                    required 
                                />
                                {cardNumber && !isCardNumberValid && (
                                    <div className="error-message">Invalid card number</div>
                                )}
                            </label>
                            <label>
                                Expiry Date:
                                <input 
                                    type="text" 
                                    pattern="[0-9/]*" 
                                    placeholder="MM/YY" 
                                    value={expiryDate} 
                                    onChange={handleExpiryDateChange} 
                                    className={!expiryDate || !isExpiryDateValid ? 'invalid' : 'valid'} 
                                    required 
                                />
                                {expiryDate && !isExpiryDateValid && (
                                    <div className="error-message">Invalid expiration date</div>
                                )}
                            </label>
                            <label>
                                CVC:
                                <input 
                                    type="text" 
                                    pattern="[0-9]*" 
                                    placeholder="CVC" 
                                    value={cvc} 
                                    onChange={handleCvcChange} 
                                    className={!cvc || !isCvcValid ? 'invalid' : 'valid'} 
                                    required 
                                />
                                {cvc && !isCvcValid && (
                                    <div className="error-message">Invalid CVC</div>
                                )}
                            </label>
                            <label>
                                Email:
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email} 
                                    onChange={handleEmailChange} 
                                    className={!email || !isEmailValid ? 'invalid' : 'valid'} 
                                    required 
                                />
                                {email && !isEmailValid && (
                                    <div className="error-message">Invalid email</div>
                                )}
                            </label>
                                <button type="submit">Pay: {(cartTotal / currencyRate).toFixed(2)} {currency} {isNetto && "+VAT" }</button>
                        </div>
                    )}
                    {paymentMethod === "blik" && (
                        <div className="blik-payment-form">
                            <label>
                                Email:
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email} 
                                    onChange={handleEmailChange} 
                                    className={!email || !isEmailValid ? 'invalid' : 'valid'} 
                                    required 
                                />
                                {email && !isEmailValid && (
                                    <div className="error-message">Invalid email</div>
                                )}
                            </label>
                            <label>
                                Blik Code:
                                <input 
                                    type="text" 
                                    inputMode="numeric" 
                                    pattern="[0-9]*" 
                                    placeholder="Enter your Blik code" 
                                    value={blikCode} 
                                    onChange={handleBlikCodeChange} 
                                    className={!blikCode || !isBlikCodeValid ? 'invalid' : 'valid'} 
                                    required 
                                />
                                {blikCode && !isBlikCodeValid && (
                                    <div className="error-message">Invalid Blik code</div>
                                )}
                            </label>
                                <button type="submit">Pay: {(cartTotal / currencyRate).toFixed(2)} {currency}  {isNetto && "+VAT"}</button>
                        </div>
                    )}
                </form>
            )}
            {notification && <AppNotification message="Purchase successful!" onClose={() => setNotification(false)} />}
        </div>
    );
};

PaymentForm.propTypes = {
    cartTotal: PropTypes.number,
};

export default PaymentForm;