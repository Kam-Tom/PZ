import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./AddProductForm.css";
import { postNewProduct } from "../../axios";
import ValidationError from "../Main/ValidNotification.jsx";

function AddProductForm({ onAddProduct }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the server API
        fetchCategories();
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://localhost:7248/categories/List');
            const data = await response.json();
            setCategories(data); // Assuming data is an array of category objects with 'Name' and 'Id' properties
        } catch (error) {
            console.error('Error fetching categories:', error);
        }


    };

    const [newProductFormData, setNewProductFormData] = useState({
        productName: "",
        category: "",
        image: "",
        price: "",
        description: "",
        quantity: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [newProductFormDataError, setNewProductFormDataError] = useState({
        productName: "Invalid product name. Its must be at least 3 characters",
        category: "Invalid category. Please select one from the list",
        image: "Invalid image. Please insert one",
        price: "Invalid price. The price must be a positive number",
        description: "Invalid description. Its must be at least 3 characters",
        quantity: "Invalid quantity. The quantity must be a positive number and decimal numbers are not allowed",
    });

    function validateProductNameAndDescription(productName) {
        return productName.length >= 3;
    }

    function validatePrice(price) {
        const regex = /^\d+(\.\d{1,2})?$/;
        return regex.test(price) && parseFloat(price) > 0;;
    }

    function validateQuantity(quantity) {
        return parseInt(quantity) > 0 && !quantity.includes(".");
    }


    const handleAddProductInputChange = (e) => {
        const { name, value, type } = e.target;
        if(name === "productName" || name === "description"){
            if (!validateProductNameAndDescription(value)) {
                setNewProductFormDataError((prevData) => ({...prevData, [name]: `Invalid ${name}. Its must be at least 3 characters`}));
            } else {
                setNewProductFormData((prevData) => ({...prevData, [name]: type === "file" ? e.target.files[0] : value, }));
                setNewProductFormDataError((prevData) => ({...prevData, [name]: null}));
            }
        }else if(name === "price"){
            if (!validatePrice(value)) {
                setNewProductFormDataError((prevData) => ({...prevData, [name]: `Invalid ${name}. The ${name} must be a positive number`}));
            } else {
                setNewProductFormData((prevData) => ({...prevData, [name]: type === "file" ? e.target.files[0] : value, }));
                setNewProductFormDataError((prevData) => ({...prevData, [name]: null}));
            }
        }else if(name === "quantity"){
            if (!validateQuantity(value)) {
                setNewProductFormDataError((prevData) => ({...prevData, [name]: `Invalid ${name}. The ${name} must be a positive number and decimal numbers are not allowed`}));
            } else {
                setNewProductFormData((prevData) => ({...prevData, [name]: type === "file" ? e.target.files[0] : value, }));
                setNewProductFormDataError((prevData) => ({...prevData, [name]: null}));
            }
        }else if(name === "category"){
            setNewProductFormData((prevData) => ({...prevData, [name]: type === "file" ? e.target.files[0] : value, }));
            setNewProductFormDataError((prevData) => ({...prevData, [name]: null}));
        }else if(name === "image"){
            if(!e.target.files[0]){
                setNewProductFormDataError((prevData) => ({...prevData, [name]: `Invalid ${name}. Please insert one`}));
            }else{
                setNewProductFormData((prevData) => ({...prevData, [name]: type === "file" ? e.target.files[0] : value, }));
                console.log(e.target.files[0]);
                setNewProductFormDataError((prevData) => ({...prevData, [name]: null}));
            }
        }


            

        if (type === "file" && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }else if(type === "file" && !e.target.files[0]){
            setImagePreview(null);
        }   
    };

    const addNewProduct = () => {
        if(newProductFormDataError.category || newProductFormDataError.productName || newProductFormDataError.image ||  newProductFormDataError.price || newProductFormDataError.description || newProductFormDataError.quantity){
        confirm("Invalid product data. Please check the errors and try again");
    }
    else{
        postNewProduct(newProductFormData);
        onAddProduct(newProductFormData);
        setNewProductFormData({
            productName: "",
            category: "",
            image: "",
            price: "",
            description: "",
            quantity: "",
        });
        setImagePreview(null);
    }
    };

    return (
        <div className="parent-container">
        <div className="form-container product-form">
            <form>
                <h1>Add New Product</h1>
                <input type="text" name="productName" placeholder="Product Name" onChange={handleAddProductInputChange} />
                <select name="category" onChange={handleAddProductInputChange} value={newProductFormData.category}>
                    <option value="" disabled>Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                </select>
                <label htmlFor="image"></label>
                <input type="file" name="image" accept="image/*" onChange={handleAddProductInputChange} />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Product Preview" />
                    </div>
                )}
                <input type="number" name="price" placeholder="Price" onChange={handleAddProductInputChange}  />
                <textarea name="description" placeholder="Description" onChange={handleAddProductInputChange} ></textarea>
                <input type="number" name="quantity" placeholder="Quantity" onChange={handleAddProductInputChange}  />
                <button type="button" onClick={addNewProduct}>Add Product</button>
            </form>
        </div>
        { (newProductFormDataError.category || newProductFormDataError.productName || newProductFormDataError.image ||  newProductFormDataError.price || newProductFormDataError.description || newProductFormDataError.quantity) && (
                <div className="error-container right">
                    <table>
                        <tbody>
                            <tr>
                        <td>{newProductFormDataError.productName && <ValidationError message={newProductFormDataError.productName} />}</td>
                            </tr>
                            <tr>
                        <td>{newProductFormDataError.category && <ValidationError message={newProductFormDataError.category} />}</td>
                            </tr>
                            <tr>
                        <td>{newProductFormDataError.image && <ValidationError message={newProductFormDataError.image} />}</td>
                            </tr>
                            <tr>
                        <td>{newProductFormDataError.price && <ValidationError message={newProductFormDataError.price} />}</td>
                            </tr>
                            <tr>
                        <td>{newProductFormDataError.description && <ValidationError message={newProductFormDataError.description} />}</td>
                            </tr>
                            <tr>
                        <td>{newProductFormDataError.quantity && <ValidationError message={newProductFormDataError.quantity} />}</td>
                            </tr>

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