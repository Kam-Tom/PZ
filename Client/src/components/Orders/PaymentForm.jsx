import React, { useState, useEffect } from "react";
import { getAll, buy } from "../../axios";
import PropTypes from 'prop-types';
import "./PaymentForm.css";

const PaymentForm = ({ cartTotal, setProducts, setCartItems }) => {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [email, setEmail] = useState("");
    const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);
    const [isCardNumberValid, setIsCardNumberValid] = useState(false);
    const [isCvcValid, setIsCvcValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [cost, setCost] = useState(0);
    async function fetch() {
        let v = await getAll(`https://localhost:7248/api/Shop/GetBasket`);
        setCost(v.cost);
        console.log(v);
    }
    useEffect(() => {
        fetch();
    }, [cartTotal]);

    async function handleSubmit(event)
    {
        event.preventDefault();
        await buy();
        cartTotal = []
        setProducts(await getAll("https://localhost:7248/Product"));
        setCartItems(await getAll("https://localhost:7248/api/Shop/GetBasket"));
        console.log("Form submitted!");
    }

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

    return (
        <div className="payment-form-container">
            <h2>Payment Form</h2>
            <form onSubmit={handleSubmit}>
                {paymentMethod === "card" && (
                    <div className="card-payment-form">
                        <label>
                            Card Number:
                            <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Enter your card number" value={cardNumber} onChange={handleCardNumberChange} required />
                            {cardNumber && !isCardNumberValid && (
                                <div className="error-message">Invalid card number</div>
                            )}
                        </label>
                        <label>
                            Expiry Date:
                            <input type="text" pattern="[0-9/]*" placeholder="MM/YY" value={expiryDate} onChange={handleExpiryDateChange} required />
                            {expiryDate && !isExpiryDateValid && (
                                <div className="error-message">Invalid expiration date</div>
                            )}
                        </label>
                        <label>
                            CVC:
                            <input type="text" pattern="[0-9]*" placeholder="CVC" value={cvc} onChange={handleCvcChange} required />
                            {cvc && !isCvcValid && (
                                <div className="error-message">Invalid CVC</div>
                            )}
                        </label>
                        <label>
                            Email:
                            <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                            {email && !isEmailValid && (
                                <div className="error-message">Invalid email</div>
                            )}
                        </label>
                        <button type="submit" style={{ backgroundColor: "#e67e22" }}>Pay: {cartTotal} zł</button>
                    </div>
                )}
            </form>
        </div>
    );
};

PaymentForm.propTypes = {
    cartTotal: PropTypes.number,
};

export default PaymentForm;