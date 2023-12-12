import React, { useState } from "react";
import "./ProductList.css";

function ProductList({ products, onEditProduct, onDeleteProduct }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const onSelectProduct = (product) => {
        setSelectedProduct(selectedProduct === product ? null : product);
    };

    const handleEditClick = (product) => {
        onEditProduct(product);
    };

    const handleDeleteClick = (product) => {
        onDeleteProduct(product);
    };

    return (
        <div className="product-list-container">
            <div className="product-details-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className="Category">Category</th>
                            <th className="Price">Price</th>
                            <th className="Availability">Availability</th>
                        </tr>
                    </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <React.Fragment key={index}>
                                    <tr className={`product-list-item ${ selectedProduct === product ? "active" : "" }`} onClick={() => onSelectProduct(product)}>
                                        <td>{product.productName}</td>
                                        <td className="Category">{product.category}</td>
                                        <td className="Price">{product.price}</td>
                                        <td className="Availability"> {product.quantity > 0 ? "In stock" : "Out of stock"}</td>
                                    </tr>
                                {selectedProduct === product && (
                                    <tr>
                                        <td colSpan="4">
                                            <div className="product-details">
                                                <div className="product-image">
                                                    <img src={selectedProduct.image} alt={selectedProduct.productName} />
                                                </div>
                                                <div className="product-info">
                                                    <h3>Name: {selectedProduct.productName}</h3>
                                                    <p>Category: {selectedProduct.category}</p>
                                                    <p>Price: {selectedProduct.price}</p>
                                                    <p>Quantity: {selectedProduct.quantity}</p>
                                                    <button onClick={() => handleEditClick(selectedProduct)}>Edit</button>
                                                    <button onClick={() => handleDeleteClick(selectedProduct)}>Delete</button>
                                                </div>
                                                <div className="product-description">
                                                    <p><strong>Description:</strong> {selectedProduct.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </React.Fragment>
                            ))}
                        </tbody>
                </table>
           </div>
      </div>
  );
}

export default ProductList;