import React, { useState } from "react";
import "./AddCategoryForm.css";

function AddCategoryForm({ onAddCategory, onClose }) {
    const [category, setCategory] = useState("");
    const [subCategories, setSubCategories] = useState([]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleAddSubCategory = () => {
        setSubCategories([...subCategories, ""]);
    };

    const handleRemoveSubCategory = () => {
        const updatedSubCategories = [...subCategories];
        updatedSubCategories.pop();
        setSubCategories(updatedSubCategories);
    };

    const handleSubCategoryChange = (e, index) => {
        const updatedSubCategories = [...subCategories];
        updatedSubCategories[index] = e.target.value;
        setSubCategories(updatedSubCategories);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCategory(category, subCategories);
        setCategory("");
        setSubCategories([]);
        onClose();
    };

    return (
        <div className="form-container category-form">
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Category:
                    <input type="text" value={category} onChange={handleCategoryChange} required />
                </label>

                {subCategories.map((subCategory, index) => (
                    <div key={index}>
                        <label>
                            Subcategory {index + 1}:
                            <input
                                type="text"
                                value={subCategory}
                                onChange={(e) => handleSubCategoryChange(e, index)}
                                required
                            />
                        </label>
                    </div>
                ))}

                <button type="button" onClick={handleAddSubCategory}>
                    Add Subcategory
                </button>

                {subCategories.length > 0 && (
                    <button type="button" onClick={handleRemoveSubCategory}>
                        Remove Last Subcategory
                    </button>
                )}
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddCategoryForm;