import React, { useState } from "react";
import "../css/AddCategoryForm.css";

function AddCategoryForm({ onAddCategory, onClose }) {
    const [category, setCategory] = useState("");

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCategory(category);
        setCategory("");
        onClose();
    };

    return (
        <div className="form-container category-form">
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
                <label>Category:
                <input type="text" value={category} onChange={handleCategoryChange} required />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddCategoryForm;