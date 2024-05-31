import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./AddProductForm.css";
import { postNewProduct } from "../../axios";
import ValidationError from "../Main/ValidNotification.jsx";
import InputThumbnail from "./ProductForm/InputThumbnail";
import InputFiles from "./ProductForm/InputFiles";
import InputImages from "./ProductForm/InputImages";

function AddProductForm({ onAddProduct }) {
    const [categories, setCategories] = useState([]);
    const [vatTypes, setVatTypes] = useState([]);

    useEffect(() => {
        // Fetch categories from the server API
        fetchCategories();
        setCategories([{"id": 1,"name": "Elektronika",},{"id": 2,"name": "Tablety",},{"id": 3,"name": "Telefony",}]);
        setVatTypes([{ "name": "Zero", "rates": 0 }, { "name": "Normal", "rates": 23 }, { "name": "Incresed", "rates": 40 }]);
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
        vatType: ""
    });

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
        return regex.test(price) && parseFloat(price) > 0;
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

    }
    };

    return (
        <div className="parent-container">

            <form className="product-form">
                <h1 className="p-title">Add New Product</h1>
                <input className="p-name" type="text" name="productName" placeholder="Product Name" onChange={handleAddProductInputChange} />

                <select name="category" className="p-category"  onChange={handleAddProductInputChange} value={newProductFormData.category}>
                    <option value="" disabled>Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                </select>
                <textarea name="description" className="p-desc" placeholder="Description" onChange={handleAddProductInputChange} ></textarea>
                <InputThumbnail className="p-thumbnail" onChange={(_) => { console.log("ProductForm Added Thumbnail") }} />

                <input type="number" name="price" className="p-netto" placeholder="Price" onChange={handleAddProductInputChange} />
                <select name="vatType" className="p-vat" onChange={() => { } } value={newProductFormData.vatType}>
                    <option value="" disabled>Select Vat Rate</option>
                    {vatTypes.map((vatType) => (
                        <option key={vatType.name} value={vatType.name}>{vatType.name}</option>
                    ))}
                </select>
                <span className="p-brutto">{`Brutto: ${10} PLN`}</span>
                <input type="number" name="quantity" className="p-quantity" placeholder="Quantity" onChange={handleAddProductInputChange} />


                <InputImages className="p-images" onChange={(_) => { console.log("ProductForm Added Images") }} />
                <InputFiles className="p-files" onChange={(_) => { console.log("ProductForm Changed Files") }} />


                <button type="button" className="p-submit" onClick={addNewProduct}>Add Product</button>
            </form>
 



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