import React, { useState, useEffect, useCallback, useContext } from "react";
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
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [notification, setNotification] = useState({ show: false, message: '' });

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

    const handleDiscountedToggle = (showDiscounted) => {
        setFilteredCategory(showDiscounted ? "Discounted" : null);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredProducts = products
        .filter((product) => !filteredCategory || product.category === filteredCategory)
        .filter((product) => !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()));

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

    return (
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
                            />
                        </div>
                        <div className="product-list-container">
                            {productRows.map((row, rowIndex) => (
                                <div key={rowIndex} className="product-list-row">
                                    {row.map((product) => (
                                        <ProductTile key={product.id} product={product} addToCart={handleAddToCart} />
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
                        <ShoppingCart 
                        cartItems={cartItems} setCartItems={setCartItems} 
                        />
                        <PaymentForm cartTotal={cartItems.cost} setProducts={setProducts} setCartItems={setCartItems} />
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
