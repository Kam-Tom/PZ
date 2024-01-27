import React from "react";
import { Link } from "react-router-dom";
import "./ProductTile.css";
import { addToCart } from "../../axios"
import PropTypes from 'prop-types';

const ProductTile = ({ product }) => {
    const isDiscounted = product.promotionPrice !== null && product.promotionPrice < product.price;

    return (
        <div className="product-tile">
            <img className="product-image" src={`https://localhost:7248/Files/${product.thumbnailUrl}`} alt={product.name} />
            <div className="product-info">
                <div className="price-stock-container">
                    {isDiscounted ? (
                        <>
                            <p className="price">Price: <del>{product.price} zł</del></p>
                            <p className="price">{(product.price * (100 - product.promotionPrice)) / 100} zł</p>
                        </>
                    ) : (
                        <p className="price">Price: {product.price} zł</p>
                    )}
                    <p className="stock">Stock: {product.stock}</p>
                </div>
                <h3 className="product-name">{product.name}</h3>
                <div className="buttons-container">
                    <Link to={`/product/${product.id}`} className="view-more-btn">View more</Link>
                    {product.stock > 0 ? (
                        <button className="cart-btn" onClick={() => addToCart(product.id)}>
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

ProductTile.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        promotionPrice: PropTypes.number,
        stock: PropTypes.number.isRequired,
        thumbnailUrl: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductTile;
