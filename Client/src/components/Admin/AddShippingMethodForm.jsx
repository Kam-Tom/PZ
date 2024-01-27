import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./AddShippingMethodForm.css";
import { postNewShippingMethod } from "../../axios.js";

function AddShippingMethodForm({ onAddShippingMethod, onClose }) {
    const [shippingMethod, setShippingMethod] = useState("");
    const [shippingCost, setShippingCost] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        postNewShippingMethod(shippingMethod, shippingCost);
        onAddShippingMethod(shippingMethod, shippingCost);
        setShippingMethod("");
        setShippingCost("");
        onClose();
    };

    return (
        <div className="form-container shipping-method-form">
            <h1>Add Shipping Method</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Shipping Method:
                    <input type="text" value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)} required />
                </label>
                <label>
                    Shipping Cost:
                    <input type="number" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

AddShippingMethodForm.propTypes = {
    onAddShippingMethod: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddShippingMethodForm;