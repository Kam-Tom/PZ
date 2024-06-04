import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductPage.css";
import { getAll, addToCart } from "../../axios";
import PropTypes from 'prop-types';
import AppNotification from "../Main/AppNotification";

const ProductPage = ( ) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        async function fetchFromDatabase() {
        setProduct(await getAll(`https://localhost:7248/Product/${parseInt(id)}`));
        }z
        fetchFromDatabase();
    }, []);

    if (!product) {
        navigate("/", { replace: true });
        return null;
    }    

    const { name, price, stock, imageUrls, description, category } = product;
    const isDiscounted = product.promotionPrice !== null && product.promotionPrice < price;

    const handleAddToCart = async () => {
        await addToCart(parseInt(id));
        setNotification(true);
    };

    return (
        
        <div className="product-detail-container" >
            <div className="product-detail-image-container">
            {imageUrls.map((image, index) => (
                <img key={index} className="product-detail-image" src={`https://localhost:7248/Files/${image}`} alt={name} sizes="(max-height 1000px) 500px, 1000px" />
            ))}
            </div>
            <div className="product-detail-info">
                <h2 className="product-detail-name">{name}</h2>
                {isDiscounted ? (
                    <>
                        <p className="product-detail-price">Price: <del>{price} zł</del> {(price * (100 - product.promotionPrice)) / 100} zł</p>
                    </>
                ) : (
                    <p className="product-detail-price">Price: {price} zł</p>
                )}
                <p className="product-detail-stock">Stock: {stock}</p>
                <p className="product-detail-category">Category: {category}</p>
                {stock > 0 ? (
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to cart</button>
                ) : (
                    <button className="out-of-stock-btn" disabled>Out of stock</button>
                )}
                {notification && <AppNotification message="Product added to cart" onClose={() => setNotification(false)} />}
                <div className="product-detail-description">{description}</div>
            </div>
        </div>
    );
};

export default ProductPage;