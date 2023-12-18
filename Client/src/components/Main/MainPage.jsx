import React, { useState, useEffect, useCallback, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

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
    //const [items, setItems] = useState([]);
     
    // async function shopItems() {
    //     let items = [];
    //     if (!cartItems.items)
    //         return items;

    //     for(let i = 0; i < cartItems.items.length; i++) {
    //         let product = await getAll(`https://localhost:7248/Product/${cartItems.items[i].id}`);
    //         const itemik = {
    //             id: product.id,
    //             name: product.name,
    //             price: product.price,
    //             image: product.imageUrls[0]
    //         }
    //         items.push(itemik)
    //     }
    //     console.log("itemki w itemshopie",items)
    //     return items;
    // }

    async function fetch() {
        setProducts(await getAll("https://localhost:7248/Product"));
        setCartItems(await getAll("https://localhost:7248/api/Shop/GetBasket"));
        }

    useEffect(() => {
        fetch();
    }, []);

    useContext(() => {
        fetch();
    })

    // const products = [
    //     {
    //         id: 0,
    //         name: 'iPhone 14 128GB 6.1"',
    //         price: "4 099 zł",
    //         stock: 7,
    //         image: "https://pngimg.com/d/iphone_14_PNG6.png",
    //         description: "Smartfon Apple 128 GB z ekranem 6,1 cala, wyświetlacz OLED. Aparat 12 Mpix, pamięć 6 GB RAM, bateria 3279mAh. Obsługuje sieć: 5G",
    //         category: "Phone",
    //     },
    //     {
    //         id: 1,
    //         name: 'Samsung Galaxy S22 Ultra',
    //         price: "4 499 zł",
    //         stock: 5,
    //         image: "https://static.api.plenti.app/file/product/2808",
    //         description: "Smartfon Samsung 128 GB z ekranem 6,8 cala, wyświetlacz Dynamic AMOLED 2X. Aparat 108 Mpix, pamięć 8 GB RAM, bateria 5000mAh. Obsługuje sieć: 5G",
    //         category: "Phone",
    //     },
    //     {
    //         id: 2,
    //         name: 'Xiaomi Mi 11 Ultra 5G 12/256GB',
    //         price: "5 699 zł",
    //         stock: 0,
    //         image: "https://mi-home.pl/cdn/shop/products/7592_k1-black-1200px-1_35179415-033a-4d1e-a2be-ed2a47fbaf26.png?v=1679742574&width=1260",
    //         description: "Smartfon Xiaomi 256 GB z ekranem 6,81 cala, wyświetlacz AMOLED. Aparat 50 Mpix, pamięć 12 GB RAM, bateria 5000mAh. Obsługuje sieć: 5G",
    //         category: "Phone",
    //     },
    //     {
    //         id: 3,
    //         name: 'LAPTOP HP PAVILION 14-CE0820ND / 4ET37EA / INTEL CORE I5 / 8GB / SSD 256GB / INTEL UHD / HD / WIN 11 / SZARY',
    //         price: "2 969 zł",
    //         stock: 2,
    //         image: "https://swiat-laptopow.pl/img/cms/HP%2014-ce/Laptop%20HP%20Pavilion%2014-ce_szary_3.png",
    //         description: "LAPTOP HP PAVILION 14 Nowoczesny i wydajny laptop HP Pavilion 14-ce to idealne narzędzie dla wymagających uczniów",
    //         category: "Laptop",
    //     },
    //     {
    //         id: 4,
    //         name: 'LAPTOP HP PAVILION 14-CE0820ND / 4ET37EA / INTEL CORE I5 / 8GB / SSD 256GB / INTEL UHD / HD / WIN 11 / SZARY',
    //         price: "2 969 zł",
    //         stock: 9,
    //         image: "https://swiat-laptopow.pl/img/cms/HP%2014-ce/Laptop%20HP%20Pavilion%2014-ce_szary_3.png",
    //         description: "LAPTOP HP PAVILION 14 Nowoczesny i wydajny laptop HP Pavilion 14-ce to idealne narzędzie dla wymagających uczniów",
    //         category: "Laptop",
    //     },
    //     {
    //         id: 5,
    //         name: 'LAPTOP HP PAVILION 14-CE0820ND / 4ET37EA / INTEL CORE I5 / 8GB / SSD 256GB / INTEL UHD / HD / WIN 11 / SZARY',
    //         price: "2 969 zł",
    //         stock: 0,
    //         image: "https://swiat-laptopow.pl/img/cms/HP%2014-ce/Laptop%20HP%20Pavilion%2014-ce_szary_3.png",
    //         description: "LAPTOP HP PAVILION 14 Nowoczesny i wydajny laptop HP Pavilion 14-ce to idealne narzędzie dla wymagających uczniów",
    //         category: "Laptop",
    //     },
    // ];


    //const [filteredCategory, setFilteredCategory] = useState(null);
    //const [searchQuery, setSearchQuery] = useState("");


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


    const addToCart2 = (productToAdd) => {
        setCartItems((prevCartItems) => [...prevCartItems, productToAdd])
    };
      
    const handleAddToCart = (product) => {
        console.log(product);
        addToCart(product);
        addToCart2(product);
    };

    // const removeFromCart = (productId) => {
    //     setCartItems((prevCartItems) =>
    //         prevCartItems.filter((item) => item.id !== productId)
    //     );
    // };

    // const calculateTotalPrice = () => {
    //     return items.reduce((total, item) => total + parseFloat(item.price.toFixed(2)))
    // };



    const handleAddReview = (newReview) => {
        // Update the reviews state with the new review
        setReviews([...reviews, newReview]);// zapisywanie do bazy nowej recenzji tutaj dodać
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Navbar onSearch={handleSearch} />
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
                        <Navbar />
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
                        <AdminPage />
                    </>
                }
            />

            <Route
                path="/order"
                element={
                    <>
                        <Navbar />
                        <ShoppingCart 
                        //cartItems={items} setCartItems={setCartItems} 
                        />
                        <PaymentForm cartTotal={cartItems.cost} />
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

export default MainPage;
