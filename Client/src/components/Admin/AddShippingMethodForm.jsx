import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./AddShippingMethodForm.css";
import { postNewShippingMethod } from "../../axios.js";
import { toast } from 'react-toastify';

function AddShippingMethodForm({ onAddShippingMethod, onClose, onAddShippingMethodSuccess }) {
    const [shippingMethod, setShippingMethod] = useState("");
    const [shippingCost, setShippingCost] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await postNewShippingMethod(shippingMethod, shippingCost);
            onAddShippingMethod(shippingMethod, shippingCost);
            setShippingMethod("");
            setShippingCost("");
            onClose();
            toast.success('Shipping method added successfully', { position: 'top-center' });
            setTimeout(() => {
                onAddShippingMethodSuccess();
            }, 1000);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Failed to add shipping method: Shipping method already exists', { position: 'top-center' });
            } else {
                toast.error('Failed to add shipping method', { position: 'top-center' });
            }
        }
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