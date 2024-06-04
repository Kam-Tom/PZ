import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

import Navbar from "./Navbar";
import LoginRegister from "../Account/LoginRegister";
import AdminPage from "../Admin/AdminPage";
import ProductTile from "../Product/ProductTile";
import ProductPage from "../Product/ProductPage";
import ProductFilter from "../Product/ProductFilter";
import ShoppingCart from "../Orders/ShoppingCart";
import PaymentForm from "../Orders/PaymentForm";
import { getAll, addToCart } from "../../axios";
import ReviewsProduct from "../Product/ReviewsProduct";
import OrderList from "../Account/OrderList";
import ProfilePage from "../Account/ProfilePage";
import { ThemeContext } from "../../ThemeContext.jsx";
import "../../ThemeStyle.css";
import "../Orders/CartAndForm.css";

function TileArray(array, size) {
    const tilesArray = [];
    for (let i = 0; i < array.length; i += size) {
        tilesArray.push(array.slice(i, i + size));
    }
    return tilesArray;
}

function MainPage() {
    const navigate = useNavigate();
    const [filteredCategory, setFilteredCategory] = useState(null);
    const [showDiscounted, setShowDiscounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [inStock, setInStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);
    const { theme } = useContext(ThemeContext);
    document.body.className = `${theme}-theme`;

    async function fetch() {
        setProducts(await getAll("https://localhost:7248/Product"));
        setCartItems(await getAll("https://localhost:7248/api/Shop/GetBasket"));
    }

    useEffect(() => {
        fetch();
    }, []);

    const handleCategorySelect = (category) => {
        setFilteredCategory(category);
    };

    const handleDiscountedToggle = (isDiscounted) => {
        setShowDiscounted(isDiscounted);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredProducts = products
        .filter((product) => !filteredCategory || product.category === filteredCategory)
        .filter((product) => !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => {
            const finalPrice = product.promotionPrice !== null 
                ? product.price * (1 - product.promotionPrice / 100)
                : product.price;
            return (!minPrice || finalPrice >= minPrice) && (!maxPrice || finalPrice <= maxPrice);
        })
        .filter((product) => !inStock || product.stock > 0)
        .filter((product) => !outOfStock || product.stock === 0)
        .filter((product) => !showDiscounted || product.promotionPrice !== null);

    const productRows = TileArray(filteredProducts, 4);
    const categories = Array.from(new Set(products.map((product) => product.category)));

    const handleAddToCart = (productId) => {
        addToCart(productId)
            .then(() => {
                setNotification({ show: true, message: 'Product added to cart' });
            })
            .catch((error) => {
            });
    };

    const handleAddReview = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    const handlePriceRangeFilter = ([min, max]) => {
        setMinPrice(min);
        setMaxPrice(max);
    };

    const handleStockFilter = (inStock, outOfStock) => {
        setInStock(inStock);
        setOutOfStock(outOfStock);
    };

    return (
        <div className={`${theme}-theme`}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar 
                            onSearch={handleSearch} 
                            notification={notification} 
                            setNotification={setNotification} 
                            />
                            <div className="filter-and-product-container">
                                <ProductFilter
                                    categories={categories}
                                    onSelectCategory={handleCategorySelect}
                                    onFilterDiscounted={handleDiscountedToggle}
                                    onFilterPriceRange={handlePriceRangeFilter}
                                    onFilterStock={handleStockFilter}
                                    showDiscounted={showDiscounted}
                                />
                            </div>
                            <div className="product-list-container">
                                {productRows.map((row, rowIndex) => (
                                    <div key={rowIndex} className="product-list-row">
                                        {row.map((product) => (
                                            <ProductTile key={product.id} product={product} addToCart={handleAddToCart} isDiscounted={product.promotionPrice !== null} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                />

                <Route
                    path="/product/:id"
                    element={
                        <>
                            <Navbar 
                            onSearch={handleSearch} 
                            notification={notification} 
                            setNotification={setNotification} 
                            />
                            <ProductPage products={products} />
                            <ReviewsProduct onAddReview={handleAddReview} />
                        </>
                    }
                />

                <Route
                    path="/account"
                    element={
                        <>
                            <LoginRegister />
                        </>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <>
                            <AdminPage onAddProduct={fetch} />
                        </>
                    }
                />

                <Route
                    path="/order"
                    element={
                        <>
                            <Navbar 
                            onSearch={handleSearch} 
                            notification={notification} 
                            setNotification={setNotification} 
                            />
                            <div className="checkout-container">
                                <ShoppingCart 
                                cartItems={cartItems} setCartItems={setCartItems} 
                                />
                                <PaymentForm cartTotal={cartItems.cost} setProducts={setProducts} setCartItems={setCartItems} />
                            </div>
                        </>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <>
                            <ProfilePage />
                        </>
                    }
                />
                
                <Route
                    path="/*"
                    element={() => {
                        navigate("/", { replace: true })
                        return null;
                    }}
                />
            </Routes>
        </div>
    );
}

MainPage.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    })),
    cartItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    })),
};

export default MainPage;
