import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductPage.css";
import { getAll, addToCart } from "../../axios";
import PropTypes from 'prop-types';
import ReviewsProduct from "./ReviewsProduct";
import { toast } from "react-toastify";

const ProductPage = ({ currencyRate, currency }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isNetto = sessionStorage.getItem("bruttoNetto") === "netto";

    const [product, setProduct] = useState(null);
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageFade, setImageFade] = useState(""); // State to control the fade-in class

    useEffect(() => {
        async function fetchFromDatabase() {
            let vatRates = await getAll("https://localhost:7248/Vat");
            let productJson = await getAll(`https://localhost:7248/Product/${parseInt(id)}`);
            const vatRate = vatRates.find(v => v.Name === productJson.vatType).Rate;

            let price = (productJson.netto + productJson.netto * (vatRate / 100)).toFixed(2);
            let promotionPrice = (productJson.promotionNetto + productJson.promotionNetto * (vatRate / 100)).toFixed(2);

            if (isNetto) {
                price = productJson.netto;
                promotionPrice = productJson.promotionNetto;
            }

            let mappedProduct = {
                ...productJson,
                price: price,
                promotionPrice: promotionPrice,

            };
            setProduct(mappedProduct);
            let pDiscount = mappedProduct.promotionPrice !== null && mappedProduct.promotionPrice != 0;
            setIsDiscounted(pDiscount);
        }
        fetchFromDatabase();
    }, [id]);

    if (!product) {
        navigate("/", { replace: true });
        return null;
    }

    const handleAddToCart = async () => {
        await addToCart(parseInt(id));
        toast.success('Product added to cart', { position: "top-center"});
    };

    const nextImage = () => {
        setImageFade("fade-in");
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrls.length);
        setTimeout(() => setImageFade(""), 500)
    };

    const prevImage = () => {
        setImageFade("fade-in");
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imageUrls.length) % product.imageUrls.length);
        setTimeout(() => setImageFade(""), 500);
    };

    console.log(product);
    return (
        <div className="product-page-container">
            <div className="image">
                <ion-icon name="chevron-back-outline" onClick={nextImage}></ion-icon>
                <img src={`https://localhost:7248/Files/${product.imageUrls[currentImageIndex]}`} alt={product.name} className={imageFade} />
                <ion-icon name="chevron-forward-outline" onClick={prevImage}></ion-icon>
            </div>
            <div className="info">
                <h2>{product.name}</h2>

                <p className="desc">{product.description}</p>
                <div className="files">
                    <h2>Files</h2>
                    {product.fileUrls.map((file, index) => (
                        <a key={index} title={product.fileDescriptions[index]} href={`https://localhost:7248/Files/${file}`} target="_blank" rel="noreferrer" download>
                            <ion-icon name="document-outline"></ion-icon>
                        </a>
                    ))}
                </div>
                <div className="buy">
                    {isDiscounted ? (
                        <div className="price-price-container">

                            <span className="price">Price: <del>{(product.price / currencyRate).toFixed(2)} {currency}</del></span>
                            <span className="price">{(product.promotionPrice / currencyRate).toFixed(2)} {currency}
                                {isNetto && <span>+Vat</span>}
                            </span>


                        </div>
                    ) : (
                            <span className="price">Price: {(product.price / currencyRate).toFixed(2)} {currency}
                            {isNetto && <span>+Vat</span>}</span>
                    )}
                    <p className="stock">Stock: {product.quantity}</p>
                    {product.quantity > 0 ? (
                        <button onClick={handleAddToCart}>Add to cart</button>
                    ) : (
                        <button disabled>Out of stock</button>
                    )}
                </div>
            </div>
            <div className="reviews">
                <ReviewsProduct />
            </div>
        </div>

    );
};

export default ProductPage;
