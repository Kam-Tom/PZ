import React, { useState } from "react";
import "./AddPromotionForm.css";
//import { postNewPromotion } from "../../axios.js";

function AddPromotionForm({ onAddPromotion, onClose }) {
    const [productName, setProductName] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [productList] = useState([
        { id: 1, name: "iphone" },
        { id: 2, name: "laptop" },
    ]);

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleDiscountAmountChange = (e) => {
        setDiscountAmount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //postNewPromotion(productName, discountAmount);
        onAddPromotion(productName, discountAmount);
        setProductName("");
        setDiscountAmount("");
        onClose();
    };

    return (
        <div className="form-container promotion-form">
            <h1>Add Promotion</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <select value={productName} onChange={handleProductNameChange} required>
                        <option value="" disabled>Select a product</option>
                        {productList.map((product) => (
                            <option key={product.id} value={product.name}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Discount Amount:
                    <input type="number" value={discountAmount} onChange={handleDiscountAmountChange} required />
                </label>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddPromotionForm;
