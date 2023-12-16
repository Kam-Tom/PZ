import React, { useState, useEffect } from "react";
import "./AddPromotionForm.css";
import { postNewPromotion } from "../../axios.js";

function AddPromotionForm({ onAddPromotion, onClose }) {
    const [productName, setProductName] = useState("");
    const [productId, setProductId] = useState();
    const [discountAmount, setDiscountAmount] = useState("");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch categories from the server API
        fetchCategories();
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://localhost:7248/Product');
            const data = await response.json();
            setProducts(data); // Assuming data is an array of category objects with 'Name' and 'Id' properties
        } catch (error) {
            console.error('Error fetching products:', error);
        }


    };

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
        let id = 0;

        for (let p of products) {
            if (e.target.value == p.name)
                id = p.id;
        }
        setProductId(id);
    };

    const handleDiscountAmountChange = (e) => {
        setDiscountAmount(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log(productId);
        e.preventDefault();
        postNewPromotion(productName, discountAmount, productId);
        onAddPromotion(productName, discountAmount, productId);
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
                        {products.map((product) => (
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
