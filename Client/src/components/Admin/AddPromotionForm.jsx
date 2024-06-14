import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./AddPromotionForm.css";
import { postNewPromotion } from "../../axios.js";
import ValidationError from "../Main/ValidNotification.jsx";

function AddPromotionForm({ onAddPromotion, onClose }) {
    const [productName, setProductName] = useState("");
    const [productNetto, setProductNetto] = useState(0);
    const [productId, setProductId] = useState();
    const [discountAmount, setDiscountAmount] = useState("");
    const [discountAmountError, setdiscountAmountError] = useState('Invalid discount');
    const [productNameError, setProductNameError] = useState('Invalid product name. Its must be selected from the list');

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch categories from the server API
        fetchProducts();
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://localhost:7248/Product');
            const data = await response.json();
            setProducts(data); // Assuming data is an array of category objects with 'Name' and 'Id' properties
        } catch (error) {
            console.error('Error fetching products:', error);
        }


    };

    const handleProductNameChange = (e) => {
        if (!e.target.value) {
            setProductNameError('Invalid product name. Its must be selected from the list');
        } else {
            setProductNameError(null);
        }
        setProductName(e.target.value);

        let id = 0;

        for (let p of products) {
            if (e.target.value == p.name)
            {
                id = p.id;
                setProductNetto(p.netto);
            }
        }

        setProductId(id);
    };

    const handleDiscountAmountChange = (e) => {
        if (!validateDiscountAmount(e.target.value)) {
            setdiscountAmountError('Invalid discount');
        } else {
            setdiscountAmountError(null);
            setDiscountAmount(e.target.value);
        }
        

    };

    const handleSubmit = (e) => {
        console.log(productId);
        e.preventDefault();
        if(discountAmountError || productNameError){
            alert("Invalid discount or product name");
        }else{
            postNewPromotion(productName, discountAmount, productId);
            onAddPromotion(productName, discountAmount, productId);
            setProductName("");
            setDiscountAmount("");
            onClose();
        }
    };

    function validateDiscountAmount(discountAmount) {
        return discountAmount >= 0;
    }

    return (
        <div className="parent-container">
        <div className="form-container promotion-form">
            <h1>Add Promotion</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <select value={productName} onChange={handleProductNameChange} required>
                        <option value="" disabled>Select a product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.name}>
                                {product.name.length > 45 ? `${product.name.slice(0, 45)}...` : product.name}
                            </option>
                        ))}
                    </select>
                    </label>
                <p>Netto: {productNetto}</p>
                <label>
                    Discount Price:
                    <input type="number"  onChange={handleDiscountAmountChange} required />
                </label>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
        { (discountAmountError || productNameError) && (
                <div className="error-container right">
                    <table>
                        <tbody>
                            <tr>
                                <td>{productNameError && <ValidationError message={productNameError} />}</td>
                            </tr>
                            <tr>
                                <td>{discountAmountError && <ValidationError message={discountAmountError} />}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

AddPromotionForm.propTypes = {
    onAddPromotion: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddPromotionForm;
