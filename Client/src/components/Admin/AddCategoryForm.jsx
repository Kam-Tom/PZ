import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./AddCategoryForm.css";
import { postNewCategory } from "../../axios.js";
import ValidationError from "../Main/ValidNotification.jsx";

function AddCategoryForm({ onAddCategory, onClose }) {
    const [category, setCategory] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [categoryError, setCategoryErorr] = useState('Invalid categoty. Its must be at least 3 characters');
    const [subCategoriesErorr, setSubCategoriesErorr] = useState([]);



    const handleAddSubCategory = () => {
        setSubCategories([...subCategories, ""]);
        const error = [...subCategoriesErorr];
        error.push(`Invalid subcategory ${subCategories.length + 1}. It must be at least 3 characters`);
        setSubCategoriesErorr(error);
    };

    const handleRemoveSubCategory = () => {
        const updatedSubCategories = [...subCategories];
        updatedSubCategories.pop();
        setSubCategories(updatedSubCategories);
        const error = [...subCategoriesErorr];
        error.pop();
        setSubCategoriesErorr(error);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if(categoryError || subCategoriesErorr.filter(error => error != null).length > 0){
            alert("Invalid category or subcategory");

        }else{
            postNewCategory(category, subCategories);
            onAddCategory(category, subCategories);
            setCategory("");
            setSubCategories([]);
            onClose();
        }
    };

    function validateCategoryAndSubCategory(category) {
        return category.length >= 3;
    }


    const handleCategoryBlur = (e) => {
        if (!validateCategoryAndSubCategory(e.target.value)) {
            setCategoryErorr('Invalid categoty. Its must be at least 3 characters');
        } else {
            setCategory(e.target.value);
            setCategoryErorr(null);
        }
    };
    const handleSubCategoryBlur = (e, index) => {
        const updatedSubCategories = [...subCategories];
        const error = [...subCategoriesErorr];
        if (!validateCategoryAndSubCategory(e.target.value)) {
            error[index] = `Invalid subcategory ${index +1}. It must be at least 3 characters`;
            setSubCategoriesErorr(error);
        } else {
            updatedSubCategories[index] = e.target.value;
            setSubCategories(updatedSubCategories);
            error[index] = null;
            setSubCategoriesErorr(error);
        }
    };

    return (
        <div className="parent-container">
            <div className="form-container category-form">
                <h1>Add Category</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Category:
                        <input type="text" onChange={handleCategoryBlur} required />
                    </label>

                    {subCategories.map((subCategory, index) => (
                        <div key={index}>
                            <label>
                                Subcategory {index + 1}:
                                <input
                                    type="text"
                                    onChange={(e) => handleSubCategoryBlur(e, index)}
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
            { (categoryError || subCategoriesErorr.filter(error => error != null).length > 0) && (
                <div className="error-container right">
                    <table>
                        <tbody>
                            <tr>
                        <td>{categoryError && <ValidationError message={categoryError} />}</td>
                            </tr>
                        {subCategoriesErorr.map((error, index) => (
                            <tr key={index}>
                                <td>{error && <div><ValidationError message={error} /></div>}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            
    </div>
    );
}

AddCategoryForm.propTypes = {
    onAddCategory: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddCategoryForm;