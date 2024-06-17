import React from "react";
import { Link } from "react-router-dom";
import "./ProductTile.css";
import { addToCart } from "../../axios"
import PropTypes from 'prop-types';


const ProductTile = ({ product, addToCart, currencyRate, currency }) => {
    const isDiscounted = product.promotionPrice !== null && product.promotionPrice != 0;
    const isNetto = sessionStorage.getItem("bruttoNetto") === "netto";

    return (
        <div className="product-tile">
            <img className="product-image" src={`https://localhost:7248/Files/${product.thumbnailUrl}`} alt={product.name} />
            <div className="product-info">
                <div className="price-stock-container">
                    {isDiscounted ? (
                        <div className="price-price-container">
                            
                            <p className="price">Price: <del>{(product.price / currencyRate).toFixed(2)} {currency}</del></p>
                            <p className="price">{(product.promotionPrice / currencyRate).toFixed(2)} {currency}
                                {isNetto && <span>+Vat</span>}
                                </p>
                            

                        </div>
                    ) : (
                            <p className="price">Price: {(product.price / currencyRate).toFixed(2)} {currency}
                                {isNetto && <span>+Vat</span>}                            </p>
                    )}
                    <p className="stock">Stock: {product.quantity}</p>
                </div>
                <h3 className="product-name">{product.name}</h3>
                <div className="buttons-container">
                    <Link to={`/product/${product.id}`} className="view-more-btn">View more</Link>
                    {product.quantity > 0 ? (
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
        price: PropTypes.string.isRequired,
        promotionPrice: PropTypes.number,
        quantity: PropTypes.number.isRequired,
        thumbnailUrl: PropTypes.string.isRequired,
    }).isRequired,
    addToCart: PropTypes.func.isRequired,
};

export default ProductTile;
