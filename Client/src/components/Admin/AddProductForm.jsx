import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./AddProductForm.css";
import { postNewProduct, getAll } from "../../axios";
import ValidationError from "../Main/ValidNotification.jsx";
import InputThumbnail from "./ProductForm/InputThumbnail";
import InputFiles from "./ProductForm/InputFiles";
import InputImages from "./ProductForm/InputImages";

function AddProductForm({ onAddProduct }) {
    const [categories, setCategories] = useState([]);
    const [vatTypes, setVatTypes] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        thumbnail: null,
        images: null,
        files: null,
        netto: "",
        vatType: "",
        quantity: "",
    });
    const [errors, setErrors] = useState({});
    const [ebe, setebe] = useState([]);

    useEffect(() => {
        // Fetch categories from the server API
        getAll('https://localhost:7248/categories').then((result) => setCategories(result));
        getAll("https://localhost:7248/Vat").then((result) => setVatTypes(result));
        
    }, []);

    const validateForm = () => {
        const errors = {};

        if (!product.name || product.name.length < 3) {
            errors.name = "Product name must be at least 3 characters long.";
        }
        if (!product.category) {
            errors.category = "Category is required.";
        }
        if (!product.description || product.description.length < 3) {
            errors.description = "Description must be at least 3 characters long.";
        }
        if (!product.netto || isNaN(product.netto) || product.netto <= 0) {
            errors.netto = "Netto must be a positive number.";
        }
        if (!product.vatType) {
            errors.vatType = "VAT type is required.";
        }
        if (!product.quantity || isNaN(product.quantity) || product.quantity < 0) {
            errors.quantity = "Quantity must be a non-negative number.";
        }
        if (!product.thumbnail) {
            errors.quantity = "Thumbnail image is required.";
        }
        return errors;
    };

    const handleInputChange = (field, value) => {
        setProduct({
            ...product,
            [field]: value,
        });
    };

    const addNewProduct = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            postNewProduct(product).then(onAddProduct);
        } else {
            setErrors(formErrors);
        }
    };

    const calculateBrutto = () => {
        const vatRate = vatTypes.find((vatType) => vatType.Name === product.vatType);
        if (vatRate) {
            const netto = parseFloat(product.netto) || 0;
            return (netto + (netto * (vatRate.Rate / 100))).toFixed(2);
        }
        return "";
    };

    const handleInputChange2 = (field, value) => {
        setebe(categories.find(category => category.id == value).subcategories);
    }

    return (
        <div className="parent-container">

            <form className="product-form">
                <h1 className="p-title">Add New Product</h1>
                <input className="p-name" type="text" name="name" placeholder="Product Name" onChange={(e) => { handleInputChange('name', e.target.value) }} />

                <select name="category" className="p-category" onChange={(e) => { handleInputChange2('category', e.target.value) }}>
                    <option value="" disabled>Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {Array.isArray(ebe) && (
                    <select name="subcategory" className="p-subcategory" onChange={(e) => { handleInputChange('category', e.target.value) }} value={product.category}>
                        <option value="" disabled>Select Subcategory</option>
                        {ebe.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                )}
                <textarea name="description" className="p-desc" placeholder="Description" onChange={(e) => { handleInputChange('description', e.target.value) }}></textarea>
                <InputThumbnail className="p-thumbnail" onChange={(data) => { handleInputChange('thumbnail',data) }} />

                <input type="number" name="netto" className="p-netto" placeholder="Netto" onChange={(e) => { handleInputChange('netto', e.target.value) }} />
                <select name="vatType" className="p-vat" onChange={(e) => { handleInputChange('vatType', e.target.value) }} value={product.vatType}>
                    <option value="" disabled>Select Vat Rate</option>
                    {vatTypes.map((vatType) => (
                        <option key={vatType.Name} value={vatType.Name}>{vatType.Name}</option>
                    ))}
                </select>
                <span className="p-brutto">{`Brutto: ${calculateBrutto()} `}</span>
                <input type="number" name="quantity" className="p-quantity" placeholder="Quantity" onChange={(e) => { handleInputChange('quantity', e.target.value) }} />


                <InputImages className="p-images" onChange={(data) => { handleInputChange('images', data) }} />
                <InputFiles className="p-files" onChange={(data) => { handleInputChange('files', data) }} />


                <button type="button" className="p-submit" onClick={addNewProduct}>Add Product</button>
            </form>
 

            {(Object.keys(errors).length > 0) && (
                <div className="error-container right">
                    <table>
                        <tbody>
                            {Object.entries(errors).map(([field, error]) => (
                                <tr key={field}>
                                    <td><ValidationError message={error} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

AddProductForm.propTypes = {
    onAddProduct: PropTypes.func.isRequired,
};

export default AddProductForm;
