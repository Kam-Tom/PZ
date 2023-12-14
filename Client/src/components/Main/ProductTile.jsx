import React from "react";
import "./ProductTile.css";

const ProductTile = ({ product }) => {
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
                        <button className="view-more-btn">View more</button>  
                        <button className="cart-btn">
                            <ion-icon name="cart-outline"></ion-icon>
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default ProductTile;