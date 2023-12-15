import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductPage.css";

const ProductPage = ({ products, onAddToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(item => item.id === parseInt(id));

    if (!product) {
        navigate("/", { replace: true });
        return null;
    }

    const { name, price, stock, image, description } = product;

    return (
        <div className="product-detail-container">
            <div className="product-detail-image-container">
                <img className="product-detail-image" src={image} alt={name} />
            </div>
            <div className="product-detail-info">
                <h2 className="product-detail-name">{name}</h2>
                <p className="product-detail-price">Price: {price}</p>
                <p className="product-detail-stock">Stock: {stock}</p>
                {stock > 0 ? (
                    <button className="add-to-cart-btn" onClick={() => onAddToCart(parseInt(id))}>Add to cart</button>
                ) : (
                    <button className="out-of-stock-btn" disabled>Out of stock</button>
                )}
                <div className="product-detail-description">{description}</div>
            </div>
        </div>
    );
};

export default ProductPage;