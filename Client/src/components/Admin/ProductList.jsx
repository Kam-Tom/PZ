import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { deleteElement, getAll } from "../../axios";

function ProductList({ onEditProduct }) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    async function fetchProducts() {
        let items = await getAll("https://localhost:7248/Product/Admin");
        setProducts(items);
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const onSelectProduct = (product) => {
        setSelectedProduct(selectedProduct === product ? null : product);
    };

    const handleEditClick = (product) => {
        onEditProduct(product);
    };

    const handleDeleteClick = async (productId) => {
        await deleteElement(`https://localhost:7248/Product/${productId}`);
        fetchProducts();
    };

    return (
        <div className="products-list-container">
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
                                        <td>{product.name}</td>
                                        <td className="Category">{product.category}</td>
                                        <td className="Price">{product.price}</td>
                                        <td className="Availability"> {product.stock > 0 ? "In stock" : "Out of stock"}</td>
                                    </tr>
                                {selectedProduct === product && (
                                    <tr>
                                        <td colSpan="4">
                                            <div className="product-details">
                                                <div className="product-image">
                                                    <img src={`https://localhost:7248/Files/${selectedProduct.thumbnailUrl}`} alt={selectedProduct.name} width={200} />
                                                </div>
                                                <div className="product-info">
                                                    <h3>Name: {selectedProduct.name}</h3>
                                                    <p>Category: {selectedProduct.category}</p>
                                                    <p>Price: {selectedProduct.price}</p>
                                                    <p>Quantity: {selectedProduct.stock}</p>
                                                    <button onClick={() => handleEditClick(selectedProduct)}>Edit</button>
                                                    <button onClick={() => handleDeleteClick(selectedProduct.id)}>Delete</button>
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