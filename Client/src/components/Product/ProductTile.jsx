import React from "react";
import { Link } from "react-router-dom";
import "./ProductTile.css";

const ProductTile = ({ product, addToCart }) => {
    return (
        <div className="product-tile">
            <img className="product-image" src={product.image} alt={product.name} />
            <div className="product-info">
                <div className="price-stock-container">
                    <p className="price">Price: {product.price}</p>
                    <p className="stock">Stock: {product.stock}</p>
                </div>
                <h3 className="product-name">{product.name}</h3>
                <div className="buttons-container">
                    <Link to={`/product/${product.id}`} className="view-more-btn">View more</Link>
                    {product.stock > 0 ? (
                        <button className="cart-btn" onClick={() => addToCart(product)}>
                            <ion-icon name="cart-outline"></ion-icon>
                        </button>
                    ) : (
                        <button className="out-of-stock-btn" disabled>Out of stock</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductTile;
