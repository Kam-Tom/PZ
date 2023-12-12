import React, { useState } from "react";
import "./AddProductForm.css";

function AddProductForm({ onAddProduct }) {
    const [newProductFormData, setNewProductFormData] = useState({
        productName: "",
        category: "",
        image: "",
        price: "",
        description: "",
        quantity: "",
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleAddProductInputChange = (e) => {
        const { name, value, type } = e.target;
        setNewProductFormData((prevData) => ({...prevData, [name]: type === "file" ? e.target.files[0] : value, }));

        if (type === "file") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const addNewProduct = () => {
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
    };

    return (
        <div className="form-container product-form">
            <form>
                <h1>Add New Product</h1>
                <input type="text" name="productName" placeholder="Product Name" onChange={handleAddProductInputChange} value={newProductFormData.productName} />
                <input type="text" name="category" placeholder="Category" onChange={handleAddProductInputChange} value={newProductFormData.category} />
                <label htmlFor="image"></label>
                <input type="file" name="image" accept="image/*" onChange={handleAddProductInputChange} />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Product Preview" />
                    </div>
                )}
                <input type="number" name="price" placeholder="Price" onChange={handleAddProductInputChange} value={newProductFormData.price} />
                <textarea name="description" placeholder="Description" onChange={handleAddProductInputChange} value={newProductFormData.description}></textarea>
                <input type="number" name="quantity" placeholder="Quantity" onChange={handleAddProductInputChange} value={newProductFormData.quantity} />
                <button type="button" onClick={addNewProduct}>Add Product</button>
            </form>
        </div>
    );
}

export default AddProductForm;