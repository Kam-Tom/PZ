import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PropTypes, { func } from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";
import LoginRegister from "../Account/LoginRegister";
import ResetPassword from "../Account/ResetPassword";
import AdminPage from "../Admin/AdminPage";
import ProductTile from "../Product/ProductTile";
import ProductPage from "../Product/ProductPage";
import ProductFilter from "../Product/ProductFilter";
import ShoppingCart from "../Orders/ShoppingCart";
import PaymentForm from "../Orders/PaymentForm";
import { getAll, addToCart } from "../../axios";
import ProfilePage from "../Account/ProfilePage";
import { ThemeContext } from "../../ThemeContext.jsx";
import ProductSorter from "../Product/ProductSorter.jsx";
import "../../ThemeStyle.css";
import "../Orders/CartAndForm.css";
import axios from "axios";
import MailPage from "../Account/MailPage";
import "./MainPage.css";

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
    const [orders, setOrders] = useState([]);
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [inStock, setInStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);
    const [sortType, setSortType] = useState(null);
    const [rate, setRate] = useState(1);
    const [currency, setCurrency] = useState("zł"); 

    let userInfo;

    const { theme } = useContext(ThemeContext);
    document.body.className = `${theme}-theme`;

    async function fetchData() {
        await fetchUserData();
        await fetchProducts();
        // checkCartItemsAvailability();
    }
    async function fetchProducts() {
        const vatRates = await getAll("https://localhost:7248/Vat");

        let productData = await getAll("https://localhost:7248/Product");

        let cart = await getAll("https://localhost:7248/api/Shop/GetBasket");

        for (const product of productData) {
            product.reviews = await getAll(`https://localhost:7248/api/Review/${product.id}`);
        }
        productData = productData.map(p => {
            const vatRate = vatRates.find(v => v.Name === p.vatType).Rate ;
            let price = (p.netto + p.netto * (vatRate / 100)).toFixed(2);
            let promotionPrice = (p.promotionNetto + p.promotionNetto * (vatRate / 100)).toFixed(2);
            if (userInfo.bruttoNetto === "netto") {
                price = p.netto;
                promotionPrice = p.promotionNetto;
            }
            return {
                id: p.id,
                name: p.name,
                price: price,
                promotionPrice: p.promotionNetto !== null ? promotionPrice : null,
                quantity: p.quantity,
                thumbnailUrl: p.thumbnailUrl,
                reviews: p.reviews,
                category: p.category,
            }
        });
        setProducts(productData);

        let cost = cart.cost;
        cart.items.map((item) => {
            const product = productData.find((p) => p.id === item.id);
            if (!product || product.quantity < item.quantity) {
                cost -= item.netto * item.quantity;
            }
        });
        cart.cost = cost;
        
        setCartItems(cart);
    }
    async function fetchUserData() {
        userInfo = await getAll(`https://localhost:7248/api/Users/GetByEmail`);

        sessionStorage.setItem("bruttoNetto", userInfo.bruttoNetto || "brutto");
        if (!userInfo) {
            setRate(1);
            return;
        }
        let currency = userInfo.currency;
        if (currency === "zł") {
            setCurrency("zł");
            setRate(1.0);
        } else if (currency === "$") {
            const rate = await getCurrencyRate("USD");
            setCurrency("$");
            setRate(rate);
        } else if (currency === "€") {
            const rate = await getCurrencyRate("EUR");
            setCurrency("€");
            setRate(rate);
        } else {
            setRate(4.0); // default rate for other currencies
        }
    }

    async function fetchOrders() {
        const orders = await getAll("https://localhost:7248/api/Shop/GetAll");
        const sessionOrders = JSON.parse(sessionStorage.getItem("orders"));
        if(!sessionStorage.getItem("orders") || sessionOrders.length !== orders.length) {
            sessionStorage.setItem("orders", JSON.stringify(orders));
            return;
        }
        for (let i = 0; i < sessionOrders.length; i++) {
            if(orders[i].status !== sessionOrders[i].status) {
                toast.success('Status zamówienia został zmieniony z ' + sessionOrders[i].status + ' na ' + orders[i].status, { position: "top-center"});
            }
        }
        sessionStorage.setItem("orders", JSON.stringify(orders));
    }

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [cartItems.cost]);

    const handleCategorySelect = (category) => {
        setFilteredCategory(category);
    };

    const handleDiscountedToggle = (isDiscounted) => {
        setShowDiscounted(isDiscounted);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleSort = (type) => {
        setSortType(type);
    };

    

    function averageRating(reviews) {
        if (reviews.length === 0) {
            return 0;
        }
        const sum = reviews.reduce((a, b) => a + b.rating, 0);
        return sum / reviews.length;
    }


    async function getCurrencyRate(currencyCode) {
        try {
            const response = await axios.get(`https://api.allorigins.win/raw?url=http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}/?format=json`);
            return response.data.rates[0].mid;
        } catch (error) {
            console.error(`Error while fetching currency rate: ${error}`);
            return 1; // return default rate in case of error
        }
    }

    const filteredAndSortedProducts = products
        .filter((product) => !filteredCategory || product.category === filteredCategory)
        .filter((product) => !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => {
            const finalPrice = product.promotionPrice !== null
                ? product.promotionPrice
                : product.price;
            return (!minPrice || finalPrice >= minPrice) && (!maxPrice || finalPrice <= maxPrice);
        })
        .filter((product) => !inStock || product.quantity > 0)
        .filter((product) => !outOfStock || product.quantity === 0)
        .filter((product) => !showDiscounted || product.promotionPrice !== null)
        .sort((a, b) => {
            switch (sortType) {
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'rating_desc':
                    return averageRating(b.reviews) - averageRating(a.reviews);
                case 'rating_asc':
                    return averageRating(a.reviews) - averageRating(b.reviews);
                case 'default':
                default:
                    return 0;
            }
        });

    const productRows = TileArray(filteredAndSortedProducts, 4);
    const categories = Array.from(new Set(products.map((product) => product.category)));

    const handleAddToCart = (productId) => {
        addToCart(productId)
            .then(() => {
                setNotification({ show: true, message: 'Product added to cart' });
            })
            .catch((error) => {
            });
    };
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = (userInfo && Number(userInfo.numOfProductOnPage) || 4)/4;
    const totalPages = Math.ceil(productRows.length / productsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePriceRangeFilter = ([min, max]) => {
        setMinPrice(min);
        setMaxPrice(max);
    };

    const handleStockFilter = (inStock, outOfStock) => {
        setInStock(inStock);
        setOutOfStock(outOfStock);
    };

    //var rate = currencyF();
    //var currency = userInfo && userInfo.currency || "zł";
    return (
        <div className={`main-page ${theme}-theme`}>
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
                                <ProductSorter onSort={handleSort} />
                            </div>
                            <div>
                                <div className="product-list-container">
                                    {productRows.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((row, rowIndex) => (
                                        <div key={rowIndex} className="product-list-row">
                                            {row.map((product) => (
                                                <ProductTile key={product.id} product={product} addToCart={handleAddToCart} isDiscounted={product.promotionPrice !== null} currencyRate={rate} currency={currency} />
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div className="pagination" style={{ position: 'absolute', bottom: '0', width: '100%' }}>
                                    {currentPage > 1 && <button style={{ fontSize: '15px', padding: '10px', margin: '5px' }} onClick={() => handlePageChange(currentPage - 1)}>{"<"}</button>}
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button style={{ fontSize: '15px', padding: '10px', margin: '5px' }} key={i} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                    ))}
                                    {currentPage < totalPages && <button style={{ fontSize: '15px', padding: '10px', margin: '5px' }} onClick={() => handlePageChange(currentPage + 1)}>{">"}</button>}
                                </div>
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
                            <ProductPage products={products}  currencyRate={rate} currency={currency} />
                        </>
                    }
                />

                <Route
                    path="/account"
                    element={
                        <>
                            <LoginRegister onLogin={fetchData} />
                        </>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <>
                            <AdminPage onAddProduct={fetchData} />
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
                                cartItems={cartItems} setCartItems={setCartItems} currencyRate={rate} currency={currency}
                                />
                                <PaymentForm cartTotal={cartItems.cost} setProducts={setProducts} setCartItems={setCartItems} currencyRate={rate} currency={currency}/>
                            </div>
                        </>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <>
                            <ProfilePage onSettingChange={ fetchData } />
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
                <Route
                    path="/mail"
                    element={
                        <>
                            <Navbar
                                onSearch={handleSearch}
                                notification={notification}
                                setNotification={setNotification}
                            />
                            <div className="mail-page-container">
                                <MailPage></MailPage>
                            </div>
                        </>
                    }
                />

                <Route
                    path="/resetpassword"
                    element=<>
                        <ResetPassword></ResetPassword>
                    </>
                />

            </Routes>
            <ToastContainer />
        </div>
    );
}

MainPage.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
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
